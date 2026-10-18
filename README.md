# Densmile Dental Clinic

- `website/` – public site (Next.js). Reads content from the CMS API. Port 3000 (use `-p 3100` if busy).
- `cms/` – separate admin app (Next.js + SQLite in `cms/data/`). Port 3001.
- `DESIGN.md` – design system reference (Airbnb, via getdesign.md); brand colour swapped to teal.

## Run (dev)

```bash
cd cms && npm run dev -- -p 3001      # admin at http://localhost:3001  (credentials in cms/.env.local)
cd website && npm run dev             # site; CMS_URL in website/.env.local
```

Start the CMS before building/running the website. Copy `.env.example` files for new environments and set a strong `SESSION_SECRET` and admin password.

## CMS manages
Site settings (hero, about, contact, hours), services, team, testimonials, FAQs, and appointment requests submitted from `/book`.
# Densmile-dental-clinic
