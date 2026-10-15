Static font instances (Bricolage 400/500, Instrument Serif italic,
JetBrains Mono 500/600) used to render link-preview (Open Graph) images in
`src/lib/og.tsx`. They match the site's fonts, which `next/font` loads for
pages but which the image renderer can't use.

- Bricolage Grotesque — Mathieu Triay
- Instrument Serif — Rodrigo Fuenzalida, Jordan Egstad
- JetBrains Mono — JetBrains

All three are licensed under the SIL Open Font License 1.1
(https://openfontlicense.org), downloaded from Google Fonts.
