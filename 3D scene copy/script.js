const getIdentity = async () => {
  return await ArcGISIdentityManager.fromToken({
    token:"<YOUR_ACCESS_TOKEN>"
  });
};
