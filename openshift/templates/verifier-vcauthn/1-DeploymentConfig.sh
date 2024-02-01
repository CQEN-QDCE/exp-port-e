# oc process -f keycloak.yaml --param-file=keycloak.dev.params.env | oc apply -f -
oc process -f aries-verifier.yaml --param-file=aries-verifier.candy-dev.params.env | oc apply -f -
oc process -f vc-authn-oidc.yaml --param-file=vc-authn-oidc.params.env | oc apply -f -