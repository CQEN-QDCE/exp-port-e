#oc process -f ./bootstraper/port-e-invitant.yaml --param-file=./bootstraper/port-e-invitant.params.env

oc process -f ./bootstraper/port-e-invitant.yaml --param-file=./bootstraper/port-e-invitant.params.env | oc apply -f -
