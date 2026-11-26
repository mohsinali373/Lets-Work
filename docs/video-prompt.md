# Walk-in video — AI generation prompt

Used by the home page scroll video (`src/components/home/WindowReveal.jsx`).
Works with Google Veo 3, Kling 2.x, Runway Gen-4 or Sora. Generate at **16:9, 1920×1080, 24 or 30 fps, 10–15 seconds, one continuous shot, no cuts, no music needed.**

## Prompt (copy this)

> A single continuous cinematic shot inside a bright, modern coworking space in Multan, Pakistan. The camera starts low in the front-right corner of a long office corridor with glass-walled rooms, warm pendant lights and a polished light-grey floor. A young Pakistani woman in her mid-20s enters the frame from the left side, wearing a mustard-yellow cotton kurta, dark trousers, a soft dark-green hijab and carrying a tote bag and a closed laptop. She walks straight ahead, away from the camera, at a natural relaxed pace. The camera glides in behind her on a smooth gimbal, following at shoulder height a few steps back. She turns into an open coworking room with a yellow feature wall, white desks with lime-green dividers and black ergonomic chairs; a few colleagues are already working. As she enters the room, the camera slowly arcs around her right side to the front. She pulls out a chair, sits at a desk, places the laptop on the desk and opens it; the screen lights her face as she smiles and starts typing. Natural morning daylight from large windows, soft shadows, realistic skin and fabric, shallow depth of field, steady camera, no camera shake, no slow motion, no text, no logos, no watermark. Photorealistic, 4K documentary style.

## Negative prompt (if the tool has one)

> cuts, scene change, jump cut, fisheye, distorted hands, extra fingers, morphing face, flicker, text, subtitles, logo, watermark, cartoon, CGI look, oversaturated, slow motion, shaky camera

## Tips

- **Image-to-video gives the closest match.** Upload a real Let's Work photo as the *end frame* (e.g. `public/img/space/hot-desks.jpg` or `team-room.jpg`) so the room she sits in is your real room.
- If the tool limits length to 5–8 s, generate two clips where clip 2 starts from the last frame of clip 1, then join them — keep the camera moving in the same direction so there is no visible cut.
- Keep her in frame the whole time; scroll-scrubbing shows every frame, so glitches are more visible than in normal playback.

## Dropping it into the site

Send the MP4 and it gets re-encoded for smooth scroll-scrubbing (keyframe every 3–4 frames, no audio):

```
ffmpeg -i new.mp4 -an -vf "scale=1280:-2,fps=30" -c:v libx264 -preset slow -crf 29 -g 4 -keyint_min 4 -pix_fmt yuv420p -movflags +faststart public/video/arrive.mp4
ffmpeg -i new.mp4 -an -vf "scale=720:-2,fps=30"  -c:v libx264 -preset slow -crf 27 -g 3 -keyint_min 3 -pix_fmt yuv420p -movflags +faststart public/video/arrive-sm.mp4
ffmpeg -i new.mp4 -frames:v 1 -vf "scale=1280:-2" -q:v 4 public/video/arrive-poster.jpg
```

Captions are timed as fractions of the clip, so no code changes are needed for a different length.
