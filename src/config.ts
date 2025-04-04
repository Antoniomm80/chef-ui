console.log(`Loading ${import.meta.env.PROD} config...`);

export const SERVER_URL = import.meta.env.PROD ? 'http://controlplane.local/chef/api/v1' : 'http://localhost:4000';