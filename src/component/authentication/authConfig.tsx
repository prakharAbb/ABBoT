export const msalConfig = {
    auth: {    
      authority: "https://login.microsoftonline.com/372ee9e0-9ce0-4033-a64a-c07073a91ecd",
      clientId: "e82da841-f081-4d6e-a040-0f2f84826e00",
      redirectUri: "http://localhost:3000",
  }
};

export const loginRequest = {
  scopes: ["User.Read"]
};