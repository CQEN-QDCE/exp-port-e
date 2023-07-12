const proofRequest = {
"@type": "https://didcomm.org/present-proof/1.0/request-presentation",
"@id": "proof-request-email-cqen",
"comment": "Merci de présenter votre attestation de email",
"request_presentations~attach": [
    {
    "@id": "libindy-request-presentation-0",
    "mime-type": "application/json",
    "data": {
        "requested_attributes": {
        "email": {
            "name": "email",
            "restrictions": [
            {
                "cred_def_id": "FUKLxsjrYSHgScLbHuPTo4:2:CQENDroitAccesVirtuel:0.1.22",
                "schema_key": {
                "name": "CQENDroitAccesVirtuel",
                "version": "0.1.22",
                "did": "FUKLxsjrYSHgScLbHuPTo4"
                }
            }
            ]
        }
        },
        "requested_predicates": {}
    }
    }
],
"service": [
    {
        "recipientKeys": [""],    // copier directement du connection_request, 
        "routingKeys": [],
        "serviceEndpoint": "https://exp-port-e-consommateur-agent.apps.exp.openshift.cqen.ca"
    }
]
};
