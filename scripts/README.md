# Script utilitaires

## oc_dump_db.sh

Extrait une sauvegarde des bases de données d'un projet déployé dans Openshift via la console oc.

```bash
# S'authentifier a la console oc
oc login --token=[TOKEN_SESSION] --server=https://api.exp.openshift.cqen.ca:6443

# Executer le script en passant le project Openshift en paramètre et le répertoie où déposer les fichiers de sauvegarde
./oc_dump_db.sh [Nom du project] [repertoire, nom du project par défaut]

```

## oc_restore_db.sh

Restaure une sauvegarde des bases de données d'un projet déployé dans Openshift via la console oc.

```bash
# S'authentifier a la console oc
oc login --token=[TOKEN_SESSION] --server=https://api.exp.openshift.cqen.ca:6443

# Executer le script en passant le project Openshift en paramètre et le répertoire contant une sauvegarde
./oc_restore_db.sh [Nom du project] [repertoire contenant sauvegarde]

```