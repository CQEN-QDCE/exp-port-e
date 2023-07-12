#oc process -f ./daemon/port-e-invitant.yaml --param-file=./daemon/port-e-invitant.params.env

oc process -f ./daemon/port-e-invitant.yaml --param-file=./daemon/port-e-invitant.params.env | oc apply -f -
