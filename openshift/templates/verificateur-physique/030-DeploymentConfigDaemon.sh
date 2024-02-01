#oc process -f ./daemon/port-e-invitant.yaml --param-file=./daemon/port-e-invitant.params.env

oc process -f ./daemon/port-e-daemon.yaml --param-file=./daemon/port-e-daemon.params.env | oc apply -f -
