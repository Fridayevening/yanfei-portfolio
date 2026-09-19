export function ProfileHeader() {
  return (
    <header className="profile-header">
      <img
        className="profile-header__portrait"
        src="/intro/onlygirl.webp"
        alt="Illustrated portrait of Yanfei Wang"
      />
      <div className="profile-header__identity">
        <p className="profile-header__eyebrow">Product · Research · Systems</p>
        <h1>Yanfei Wang</h1>
        <p className="profile-header__summary">
          Bilingual (EN/CN) B2B SaaS Product Manager <span aria-hidden="true">|</span>{' '}
          Platform &amp; Integration <span aria-hidden="true">|</span> Cross-Border China–EU{' '}
          <span aria-hidden="true">|</span> PMP <span aria-hidden="true">|</span> MSc HCI @ UCD{' '}
          <span aria-hidden="true">|</span> Dublin
        </p>
      </div>
    </header>
  )
}
