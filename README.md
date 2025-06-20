## Getting Started

For detailed setup instructions, refer to the [Installation Guide](./INSTALLATION.md).

```bash
git clone https://github.com/thisiscsim/csim.git
cd csim
npm install

# Option 1: Quick setup with 1Password (recommended)
./scripts/quick-env-setup.sh
# Then paste your env vars from 1Password and press Ctrl+D

# Option 2: Manual setup
cp env.example .env.local
# Edit .env.local with your Notion API credentials

npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

**Note:** You'll need to set up your Notion API key and database ID. See the [Installation Guide](./INSTALLATION.md) for details.

## Deployment

You can deploy your site to any hosting platform that supports Next.js. For the easiest deployment experience, consider using Vercel:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fibelick%2Fnim&env=NEXT_PUBLIC_SITE_URL&project-name=nim&repository-name=nim&redirect-url=https%3A%2F%2Ftwitter.com%2Fibelick&demo-title=Nim&demo-description=Nim%20is%20a%20free%20and%20open-source%20minimal%20personal%20website%20template%20built%20with%20Next.js%2015%2C%20React%2019%2C%20and%20Motion-Primitives.&demo-url=https%3A%2F%2Fnim.vercel.app&demo-image=https%3A%2F%2Fraw.githubusercontent.com%2Fibelick%2Fnim%2Frefs%2Fheads%2Fmain%2F.github%2Fassets%2Freadme.png&teamSlug=ibelick)
