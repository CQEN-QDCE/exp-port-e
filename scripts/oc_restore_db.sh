#!/bin/bash

PROJECT_NAME=$1
DUMP_DIR=$2

# Restore Wallet
WALLET_POD=$(oc get pods -n $PROJECT_NAME --field-selector=status.phase=Running | grep wallet | awk '{print $1}')

oc cp $DUMP_DIR/wallet.db ${WALLET_POD}:/tmp/wallet.db -n $PROJECT_NAME
oc exec $WALLET_POD -n $PROJECT_NAME -- pg_restore --create -d postgres "/tmp/wallet.db"
oc exec $WALLET_POD -n $PROJECT_NAME -- rm /tmp/wallet.db

# Restore Backend DB
BACKEND_DB_POD=$(oc get pods -n $PROJECT_NAME --field-selector=status.phase=Running | grep backend-db | awk '{print $1}')

oc cp $DUMP_DIR/backend-db.db ${BACKEND_DB_POD}:/tmp/backend-db.db -n $PROJECT_NAME
oc exec $BACKEND_DB_POD -n $PROJECT_NAME -- pg_restore --clean --if-exists -d porte "/tmp/backend-db.db"
oc exec $BACKEND_DB_POD -n $PROJECT_NAME -- rm /tmp/backend-db.db
