"use client";

import { useEffect, useRef } from "react";

const VS_SOURCE = `
  attribute vec2 a_pos;
  void main() {
    gl_Position = vec4(a_pos, 0.0, 1.0);
  }
`;

const FS_SOURCE = `
  precision highp float;
  uniform vec2  u_resolution;
  uniform float u_time;
  uniform vec2  u_mouse;

  float hash(vec2 p) {
    p = fract(p * vec2(123.34, 456.21));
    p += dot(p, p + 45.32);
    return fract(p.x * p.y);
  }

  float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    f = f * f * (3.0 - 2.0 * f);
    float a = hash(i);
    float b = hash(i + vec2(1.0, 0.0));
    float c = hash(i + vec2(0.0, 1.0));
    float d = hash(i + vec2(1.0, 1.0));
    return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
  }

  float fbm(vec2 p) {
    float v = 0.0;
    float a = 0.5;
    mat2 rot = mat2(0.8, 0.6, -0.6, 0.8);
    for (int i = 0; i < 5; i++) {
      v += a * noise(p);
      p = rot * p * 2.1 + vec2(1.7, 9.2);
      a *= 0.5;
    }
    return v;
  }

  void main() {
    vec2 uv = (gl_FragCoord.xy - 0.5 * u_resolution) / min(u_resolution.x, u_resolution.y);
    uv -= u_mouse * 0.10;
    uv.y += 0.05;

    float Rs  = 0.34;
    float Rin = Rs * 1.5;
    float Rout = Rs * 5.2;

    float pitch = 0.26 + u_mouse.y * 0.07;
    float camDist = 4.2;
    vec3 ro  = vec3(0.0, sin(pitch) * camDist, -cos(pitch) * camDist);
    vec3 fwd = normalize(vec3(0.0) - ro);
    vec3 right = normalize(cross(vec3(0.0, 1.0, 0.0), fwd));
    vec3 up    = cross(fwd, right);
    vec3 rd    = normalize(fwd * 1.9 + right * uv.x + up * uv.y);

    vec3  p = ro;
    vec4  col = vec4(0.0);
    float minR = 100.0;
    bool  hitHorizon = false;
    float stepSize = 0.076;

    for (int i = 0; i < 60; i++) {
      float r = length(p);
      if (r < minR) minR = r;
      if (r < Rs) { hitHorizon = true; break; }

      vec3 pNext = p + rd * stepSize;
      float rNext = length(pNext);

      /* Equatorial disk crossing */
      if (p.y * pNext.y <= 0.0 && rNext < Rout * 1.1) {
        float t      = abs(p.y) / (abs(p.y) + abs(pNext.y) + 0.00001);
        vec3  hitPos = mix(p, pNext, t);
        float hitR   = length(hitPos.xz);

        if (hitR >= Rin && hitR <= Rout) {
          float phi = atan(hitPos.z, hitPos.x);
          float omega = 3.0 / (hitR * sqrt(hitR));
          float rotAngle = phi - omega * u_time * 0.7;

          vec2 diskUV = vec2(hitR * 4.8 - u_time * 0.3, rotAngle * 3.2 + hitR * 2.5);
          float turb = fbm(diskUV);
          float turb2 = fbm(diskUV * 2.3 + vec2(turb * 2.0, -turb * 1.6));

          float radial = smoothstep(Rin, Rin + Rs * 0.3, hitR) * (1.0 - smoothstep(Rin + Rs * 0.95, Rout, hitR));
          float density = radial * (0.3 + 0.7 * turb2);

          /* Relativistic Doppler beaming */
          vec3 vOrb = normalize(vec3(-hitPos.z, 0.0, hitPos.x));
          float beta = dot(vOrb, -rd) * 0.62 * sqrt(Rs / hitR);
          float gamma2 = 1.0 / sqrt(max(0.05, 1.0 - beta * beta));
          float doppler = 1.0 / (gamma2 * max(0.1, 1.0 - beta));
          float beaming = pow(doppler, 3.2);

          /* Teal-accented CRT terminal palette — matches the site accent colour */
          vec3 hotCol  = vec3(0.88, 1.0,  0.97);   /* near-white hot-spot */
          vec3 midCol  = vec3(0.08, 0.89, 0.78);   /* #14e4c7 teal */
          vec3 coolCol = vec3(0.03, 0.35, 0.30);   /* deep dim teal */

          float temp = clamp(density * beaming * 0.68, 0.0, 1.6);
          vec3 plasma = mix(coolCol, midCol, clamp(temp, 0.0, 1.0));
          plasma = mix(plasma, hotCol,  clamp(temp - 0.65, 0.0, 1.0));
          plasma *= (1.0 + beaming * 0.75);

          float alpha = clamp(density * 0.85, 0.0, 0.96);
          col.rgb += plasma * alpha * (1.0 - col.a);
          col.a   += alpha * (1.0 - col.a);
        }
      }

      /* Photon geodesic deflection (GR curvature) */
      vec3 accel = -normalize(p) * (1.5 * Rs / (r * r));
      rd = normalize(rd + accel * stepSize);
      p  = pNext;
      if (col.a > 0.98) break;
    }

    /* Photon ring caustic */
    float ringD = abs(minR - Rs * 1.10);
    float pRing = 0.003 / (ringD * ringD + 0.0003);
    pRing = clamp(pRing, 0.0, 3.5);
    vec3 ringCol = vec3(0.85, 1.0, 0.95);
    col.rgb += ringCol * pRing * 0.80 * (1.0 - col.a);
    col.a   += clamp(pRing * 0.45, 0.0, 1.0) * (1.0 - col.a);

    /* Deep-space starfield */
    if (!hitHorizon && col.a < 0.97) {
      vec2 sUV = vec2(atan(rd.z, rd.x) * 4.5, rd.y * 6.5);
      float sHash = hash(floor(sUV * 16.0));
      float star = 0.0;
      if (sHash > 0.984) {
        vec2 loc = fract(sUV * 16.0) - 0.5;
        star = smoothstep(0.11, 0.0, length(loc)) * (0.35 + 0.65 * sin(u_time * 1.9 + sHash * 38.0));
      }
      float dust = fbm(rd.xy * 2.6 + vec2(u_time * 0.018, 0.0)) * 0.13;
      vec3 bgCol = vec3(0.004, 0.006, 0.010) + vec3(star) * 0.7 + ringCol * dust * 0.12;
      col.rgb += bgCol * (1.0 - col.a);
    }

    if (hitHorizon) col.rgb = vec3(0.0);

    /* Lens vignette */
    float vig = 1.0 - dot(uv, uv) * 0.30;
    col.rgb *= max(0.0, vig);

    gl_FragColor = vec4(col.rgb, 1.0);
  }
`;

function compileShader(gl: WebGLRenderingContext, type: number, src: string) {
  const shader = gl.createShader(type)!;
  gl.shaderSource(shader, src);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    console.error("[BlackHole shader]", gl.getShaderInfoLog(shader));
    gl.deleteShader(shader);
    return null;
  }
  return shader;
}

export function BlackHoleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = (canvas.getContext("webgl") ??
      canvas.getContext("experimental-webgl")) as WebGLRenderingContext | null;
    if (!gl) return;

    const vs = compileShader(gl, gl.VERTEX_SHADER, VS_SOURCE);
    const fs = compileShader(gl, gl.FRAGMENT_SHADER, FS_SOURCE);
    if (!vs || !fs) return;

    const prog = gl.createProgram()!;
    gl.attachShader(prog, vs);
    gl.attachShader(prog, fs);
    gl.linkProgram(prog);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) {
      console.error("[BlackHole program]", gl.getProgramInfoLog(prog));
      return;
    }
    gl.useProgram(prog);

    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]),
      gl.STATIC_DRAW
    );

    const aPos = gl.getAttribLocation(prog, "a_pos");
    gl.enableVertexAttribArray(aPos);
    gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);

    const uRes   = gl.getUniformLocation(prog, "u_resolution");
    const uTime  = gl.getUniformLocation(prog, "u_time");
    const uMouse = gl.getUniformLocation(prog, "u_mouse");

    let mx = 0, my = 0, tmx = 0, tmy = 0;
    const DPR = Math.min(window.devicePixelRatio || 1, 1.5);

    const resize = () => {
      canvas.width  = window.innerWidth  * DPR;
      canvas.height = window.innerHeight * DPR;
      gl.viewport(0, 0, canvas.width, canvas.height);
    };
    resize();
    window.addEventListener("resize", resize);

    const onMouse = (e: MouseEvent) => {
      tmx = (e.clientX / window.innerWidth  - 0.5) * 2;
      tmy = (0.5 - e.clientY / window.innerHeight) * 2;
    };
    window.addEventListener("mousemove", onMouse);

    const t0 = performance.now();
    let raf: number;

    const render = () => {
      const elapsed = (performance.now() - t0) * 0.001;
      mx += (tmx - mx) * 0.04;
      my += (tmy - my) * 0.04;

      gl.useProgram(prog);
      gl.uniform2f(uRes,   canvas.width, canvas.height);
      gl.uniform1f(uTime,  elapsed);
      gl.uniform2f(uMouse, mx, my);
      gl.drawArrays(gl.TRIANGLES, 0, 6);

      raf = requestAnimationFrame(render);
    };
    raf = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMouse);
      gl.deleteProgram(prog);
      gl.deleteShader(vs);
      gl.deleteShader(fs);
      gl.deleteBuffer(buf);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        inset: 0,
        width: "100vw",
        height: "100vh",
        pointerEvents: "none",
        zIndex: 0,
        opacity: 0.92,
      }}
      aria-hidden="true"
    />
  );
}
