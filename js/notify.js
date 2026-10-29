// Emails you the moment she says yes, through Web3Forms (free; no server needed).
// The access key lives in config.js; your email address never appears in the site's code.
window.Notify = (function () {
  const { notify, herName } = window.SITE;
  let sent = false;

  function saidYes({ noAttempts }) {
    if (sent) return;
    sent = true;

    if (!notify || !notify.web3formsKey) {
      console.warn("Notify: no Web3Forms access key in config.js, so no email was sent.");
      return;
    }

    const when = new Date().toLocaleString("en-GB", { dateStyle: "full", timeStyle: "short" });
    const tries =
      noAttempts === 0
        ? "She didn't even try the No button."
        : "She tried to press No " + noAttempts + (noAttempts === 1 ? " time" : " times") + " first.";

    const data = new FormData();
    data.append("access_key", notify.web3formsKey);
    data.append("subject", notify.subject.replace(/\{herName\}/g, herName));
    data.append("from_name", "Birthday website");
    data.append("message", herName + " said yes on " + when + " (her time). " + tries);

    // keepalive lets the request finish even if she closes the page straight away.
    fetch("https://api.web3forms.com/submit", { method: "POST", body: data, keepalive: true })
      .then((res) => res.json())
      .then((res) => {
        if (!res.success) console.warn("Notify: Web3Forms refused the alert:", res.message);
      })
      .catch((err) => console.warn("Notify: the alert could not be sent:", err));
  }

  return { saidYes };
})();
