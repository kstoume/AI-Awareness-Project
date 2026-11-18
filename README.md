# AI Awareness Project — Facebook archive website

Contains **147** substantial Facebook posts dated on or before November 17, 2026, with their available attached media and source links. The export also contained entries with timestamps after November 17, 2026; those were excluded pending review. Shared links without substantive post text were not converted into articles. Categories were automatically inferred and should be reviewed before public launch.

## Preview
Open index.html in a browser. No build tools or server required.

## Publish with Netlify
1. Extract this ZIP.
2. Go to https://app.netlify.com/drop and drag the **ai-awareness-project-facebook** folder into the drop zone.
3. In Netlify's Domain management add aiawarenessproject.org and follow the provider-specific DNS instructions.
4. Add aiawarenessproject.com as a domain alias and configure a permanent redirect to the .org site.
5. Verify HTTPS works for both domains. Do not change email-related DNS records (MX, SPF, DKIM) unnecessarily.

## Editing
- posts-data.js contains post data for the browser; posts.json is the editable source archive.
- Category choices were made by keyword matching, not from verified Facebook metadata.
- The original Facebook export includes some mojibake; common UTF-8 misdecoding was repaired.
- Avoid publishing private or copyrighted third-party media without reviewing permissions.
- Fact-check time-sensitive claims before publishing.

## Visual identity
This edition uses the original AI Awareness Project circular logo and Facebook cover image supplied by the project owner. The homepage has been simplified to a cleaner editorial layout with navy, white, and gold branding.
