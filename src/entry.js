// Preserve the requested locale route while resolving every virtual document path to the canonical HTML asset.
// Сохранять запрошенный языковой маршрут, разрешая каждый виртуальный document-path в канонический HTML-ресурс.
import communityWorker,{handleRequest as handleCommunityRequest} from './worker.js';

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
  return handleCommunityRequest(request,documentAwareEnvironment(env));
}

export default{
  fetch(request,env,context){
    return handleRequest(request,env,context);
  }
};

export{communityWorker};
