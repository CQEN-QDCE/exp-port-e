#!/bin/bash

PROJECT_NAME=$1
DUMP_DIR=$2

if [ -z "$DUMP_DIR" ]; then
    DUMP_DIR="./${PROJECT_NAME}"
fi

mkdir -p "${DUMP_DIR}"

# Backup Wallet
WALLET_POD=$(oc get pods -n $PROJECT_NAME --field-selector=status.phase=Running | grep wallet | awk '{print $1}')

oc exec $WALLET_POD -n $PROJECT_NAME -- pg_dump --format=custom aries_issuer > "${DUMP_DIR}/wallet.db"

# Backup Backend DB
BACKEND_DB_POD=$(oc get pods -n $PROJECT_NAME --field-selector=status.phase=Running | grep backend-db | awk '{print $1}')

oc exec $BACKEND_DB_POD -n $PROJECT_NAME -- pg_dump --format=custom porte > "${DUMP_DIR}/backend-db.db"
