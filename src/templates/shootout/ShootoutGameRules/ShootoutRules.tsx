export default function ShootoutRules() {
  return (
    <>
      <h1>Règles du Shootout</h1>
      <ul>
        <li>Les joueurs effectuent un « lag » pour déterminer celui qui fera la casse.</li>
        <li>Chaque manche dure 10 minutes.</li>
        <li>
          Il y a un chronomètre des tirs. Pendant les <strong>5 premières minutes</strong> du match, les joueurs ont{' '}
          <strong>15 secondes</strong> par tir mais pendant les <strong>5 dernières minutes</strong> ce temps est{' '}
          <strong>réduit à 10 secondes</strong>. Ne pas frapper la bille de choc dans le temps imparti entraîne une
          pénalité de <strong>5 points</strong>.
        </li>
        <li>
          Les joueurs doivent <strong>toucher une bande</strong> avec n’importe quelle bille ou{' '}
          <strong>empocher une bille</strong> à chaque tir.
        </li>
        <li>
          Toutes les fautes sont sanctionnées par un <strong>« ball in hand »</strong> (remise en place manuelle de la
          bille n’importe où sur la table par le joueur adverse).
        </li>
        <li>
          En cas de <strong>match nul</strong>, l’empochage de la bille bleue sert à déterminer le vainqueur. Après un «
          lag », cette bille bleue est placée sur sa mouche et la bille de choc dans le « D ».
        </li>
      </ul>
    </>
  )
}
