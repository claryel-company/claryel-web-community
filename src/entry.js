// Preserve the requested locale route while resolving every virtual document path to the canonical HTML asset.
// Сохранять запрошенный языковой маршрут, разрешая каждый виртуальный document-path в канонический HTML-ресурс.
import communityWorker,{handleRequest as handleCommunityRequest} from './worker.js';
import {handleComplianceRequest,injectComplianceAssets} from './compliance.js';

function documentAwareEnvironment(env){
  const assets=env?.ASSETS;
  if(!assets?.fetch)return env;
  return{
    ...env,
    ASSETS:{
      async fetch(request){
        const url=new URL(request.url);
        if(!url.pathname.includes('.')){
          const indexUrl=new URL('/index.html',url);
          return assets.fetch(new Request(indexUrl,request));
        }
        return assets.fetch(request);
      }
    }
  };
}

export async function handleRequest(request,env){
  const adjustedEnvironment=documentAwareEnvironment(env);
  const complianceResponse=await handleComplianceRequest(request,adjustedEnvironment);
  if(complianceResponse)return injectComplianceAssets(complianceResponse,request);
  const response=await handleCommunityRequest(request,adjustedEnvironment);
  return injectComplianceAssets(response,request);
}

export default{
  fetch(request,env,context){
    return handleRequest(request,env,context);
  }
};

export{communityWorker};
