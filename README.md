# 2016_lezoux_1832fahrenheit

1. Télécharger et extraire l'archive .zip
1. Ouvrir l'invité de commandes et naviguer vers le dossier
`cd path/to/folder/2016_lezoux_1832fahrenheit-master`
1. Installer npm `npm install`
1. (Installer et) lancer [Arduino](https://www.arduino.cc/)
1. Brancher l'Arduino au PC (ou Raspberry) via USB
1. Dans Arduino, Outils > Type de carte, sélectionner le modèle de carte utilisée (Genuino Uno)
1. Dans Ardunio, Outils > Port, relever l'intitulé du port USB sur lequel la carte Arduino est branchée. (par exemple  `/dev/cu.usbmodemXXXX`)
1. Reporter cette valeur dans le fichier `config.js`, ligne `serialPort`
1. Dans l'invité de commandes, taper `node index.js`
1. Ouvrir une page web et entrer l'adresse `http://localhost:3000/`

Le dispositif est maintenant installé. Ne pas oublier de brancher le câble USB de la souris au PC (ou Raspberry) et d'afficher la page web pour récupérer l'information quand la platine tourne.
