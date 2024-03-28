import { ArcGISIdentityManager, ApiKeyManager } from '@esri/arcgis-rest-request';
import {
  createFeatureService,
  addToServiceDefinition,
} from '@esri/arcgis-rest-feature-service';

/*
const getIdentity = async () => {
  return await ArcGISIdentityManager.fromToken({
    token:"123"
  });
};
*/

const getIdentityKey = async () => {
    return await ApiKeyManager.fromKey('AAPK6b94cdfb127e45c4af821058afcc069ddl02lEjYxQnDnuK17AFzZ0sxdJaBH1Yijkj5cdvfDKKHbTJyL_jSJddv2hkcmVQP');
};

console.log(getIdentityKey);