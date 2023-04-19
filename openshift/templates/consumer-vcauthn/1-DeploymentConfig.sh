oc process -f keycloak.yaml --param-file=keycloak.dev.params | oc apply -f -
oc process -f database-build.yaml --param-file=database-build.param | oc apply -f -
oc process -f ../../../../aries-toolkit/openshift/templates/verifier/aries-verifier.yaml --param-file=../../../../aries-toolkit/openshift/templates/verifier/aries-verifier.candy-dev.params | oc apply -f -
oc process -f vc-authn-oip-rev-build.yaml --param-file=vc-authn-oip-rev-build.param | oc apply -f -
oc process -f vc-authn-oip-rev-deploy.yaml --param-file=vc-authn-oip-rev-deploy.param | oc apply -f -
