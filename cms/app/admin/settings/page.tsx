import { getSettings } from "@/lib/db";
import { saveSettings } from "@/lib/actions";
import SettingsForm from "./settings-form";

export const dynamic = "force-dynamic";

export default async function SettingsPage() {
  const settings = await getSettings();

  return (
    <>
      <div className="page-header">
        <div className="page-header-info">
          <h1>Website & Practice Settings</h1>
          <p>Configure clinic contact info, hero headlines, practice statistics, and section copy.</p>
        </div>
      </div>

      <SettingsForm values={settings} action={saveSettings} />
    </>
  );
}
