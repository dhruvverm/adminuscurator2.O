import { requireRole } from "@/lib/auth";
import { read } from "@/lib/store";
import { RoleSelect } from "@/components/admin/RowControls";
import { OrderStatusPill } from "@/components/admin/StatusPill";

export const metadata = { title: "Customers" };

export default async function CustomersPage() {
  const me = await requireRole("admin");
  const { users } = await read();
  const list = [...users].reverse();
  return (
    <>
      <div className="app-header">
        <div>
          <h1>Customers &amp; users</h1>
          <p>{users.length} account{users.length === 1 ? "" : "s"}. Admins manage everything; editors manage content and messages.</p>
        </div>
      </div>
      <section className="panel">
        <div style={{ overflowX: "auto" }}>
          <table className="table">
            <thead><tr><th>Name</th><th>Email</th><th>Plan</th><th>Joined</th><th>Sign-in</th><th>Role</th></tr></thead>
            <tbody>
              {list.map((u) => (
                <tr key={u.id}>
                  <td><strong>{u.name}</strong></td>
                  <td>{u.email}</td>
                  <td>{u.subscription ? <OrderStatusPill status="active" /> : <span className="subtle">—</span>} {u.subscription?.planId}</td>
                  <td>{new Date(u.createdAt).toLocaleDateString()}</td>
                  <td>{[u.passwordHash && "Password", u.googleId && "Google"].filter(Boolean).join(", ")}</td>
                  <td><RoleSelect userId={u.id} role={u.role} disabled={u.id === me.id} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
}
