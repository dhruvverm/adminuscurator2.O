import { logoutEverywhere } from "@/app/actions/auth";
import { requireUser } from "@/lib/auth";
import { findUserById } from "@/lib/store";
import { PasswordForm, ProfileForm } from "./SettingsForms";

export const metadata = { title: "Account settings", robots: { index: false } };

export default async function SettingsPage() {
  const user = await requireUser("/dashboard/settings");
  const full = await findUserById(user.id);
  return (
    <>
      <div className="app-header">
        <div>
          <h1>Account settings</h1>
          <p>Update your profile and security settings.</p>
        </div>
      </div>
      <div className="grid" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 380px), 1fr))", alignItems: "start" }}>
        <section className="panel">
          <div className="panel__head"><h2>Profile</h2></div>
          <div className="panel__body"><ProfileForm name={user.name} email={user.email} /></div>
        </section>
        <section className="panel">
          <div className="panel__head"><h2>Password</h2></div>
          <div className="panel__body"><PasswordForm hasPassword={!!full?.passwordHash} /></div>
        </section>
        <section className="panel">
          <div className="panel__head"><h2>Sessions</h2></div>
          <div className="panel__body">
            <p className="muted">Signed in on a shared or lost device? Sign out everywhere.</p>
            <form action={logoutEverywhere} className="mt-4">
              <button type="submit" className="btn btn--danger btn--sm">Sign out of all devices</button>
            </form>
          </div>
        </section>
      </div>
    </>
  );
}
