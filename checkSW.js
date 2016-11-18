'use strict';

(function(){
  if ('serviceWorker' in navigator) {
    console.log('sw is ok update 3');
    navigator.serviceWorker.register('/ServiceWorker.js', {scope: '/'}).then(()=>{
      console.log('sw berhasil di register');
    })
    .catch((e)=>{
      console.log('sw gagal di register ' + e);
    });
  } else {
    console.log('sw is not ok');
  }
})();
