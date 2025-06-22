// pages/VerifyFail.jsx
const VerifyFail = () => {
  return (
    <div style={{ textAlign: "center", padding: "2rem" }}>
      <h2>Token invalid sau expirat ❌</h2>
      <p>
        Poți <a href="/auth/register">înregistra un cont nou</a> sau{" "}
        <a href="/auth/login">autentifica</a> dacă l-ai verificat deja.
      </p>
    </div>
  );
};

export default VerifyFail;
