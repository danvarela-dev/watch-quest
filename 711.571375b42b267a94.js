"use strict";(self.webpackChunkwatch_quest=self.webpackChunkwatch_quest||[]).push([[711],{711:(L,C,r)=>{r.r(C),r.d(C,{SeriesModule:()=>H});var p=r(4755),O=r(3144),T=r(826),h=r(6789),S=r(2496),F=r(2286),l=r(9751),y=r(5698),x=r(4004),s=r(1535),d=r(6305),e=r(2223),g=r(7449),A=r(1927);const _=function(i,c){return{currentSlidePage:i,slides:c}};let P=(()=>{class i{constructor(t,n){this.store=t,this.route=n,this.onTheAir$=new l.y,this.popular$=new l.y,this.topRated$=new l.y,this.airingToday$=new l.y,this.currentOnTheAirPage=1,this.currentPopularPage=1,this.currentTopRatedPage=1,this.currentAiringTodayPage=1}ngOnInit(){this.store.dispatch(s.F.loadSeries({category:"onTheAir",page:1})),this.store.dispatch(s.F.loadSeries({category:"popular",page:1})),this.store.dispatch(s.F.loadSeries({category:"topRated",page:1})),this.store.dispatch(s.F.loadSeries({category:"airingToday",page:1})),this.onTheAir$=this.store.select(d.wu),this.popular$=this.store.select(d.xr),this.topRated$=this.store.select(d.Gr),this.airingToday$=this.store.select(d.QB)}openSeriesDetails(t,n){this.store.dispatch(s.F.loadSerieDetails({id:t,category:n})),this.store.dispatch(s.F.loadSerieProviders({id:t})),this.store.dispatch(s.F.loadSerieCast({id:t})),this.route.navigate(["/cms/series",n,t])}getNextPage(t,n){let a;switch(t){case"onTheAir":this.currentAiringTodayPage=n,a=d.P1;break;case"popular":this.currentPopularPage=n,a=d.yP;break;case"topRated":this.currentTopRatedPage=n,a=d.S9;break;case"airingToday":this.currentAiringTodayPage=n,a=d.OI}a&&this.store.select(a).pipe((0,y.q)(1),(0,x.U)(o=>o+1)).subscribe(o=>{this.store.dispatch(s.F.loadSeries({category:t,page:o})),this.store.dispatch(s.F.loadFavoriteSeries()),this.store.dispatch(s.F.loadWatchlistSeries()),this.store.dispatch(s.F.loadRatedSeries())})}rateSerie(t){this.store.dispatch(s.F.rateSerie({rating:t.rating,id:t.id}))}addToWatchlist(t){this.store.dispatch(s.F.addToWatchlist({data:{request:t}})),t.watchlist||this.store.dispatch(s.F.removeFromWatchlist({id:t.media_id}))}addFavorite(t){this.store.dispatch(s.F.addFavorite({data:{request:t}})),t.favorite||this.store.dispatch(s.F.removeFavorite({id:t.media_id}))}}return i.\u0275fac=function(t){return new(t||i)(e.Y36(h.yh),e.Y36(g.F0))},i.\u0275cmp=e.Xpm({type:i,selectors:[["app-series-dashboard"]],decls:21,vars:20,consts:[[1,"series"],[1,"popular"],[1,"title"],[1,"list"],[3,"slidesPagePair","mediaType","onAddFavorite","onAddToWatchlist","getNewSlides","onRate","onMediaSelect"],[1,"now-playing"],[1,"top-rated"],[1,"upcoming"]],template:function(t,n){1&t&&(e.TgZ(0,"div",0)(1,"div",1)(2,"div",2),e._uU(3,"Popular"),e.qZA(),e.TgZ(4,"div",3)(5,"app-carousel",4),e.NdJ("onAddFavorite",function(o){return n.addFavorite(o)})("onAddToWatchlist",function(o){return n.addToWatchlist(o)})("getNewSlides",function(o){return n.getNextPage("popular",o)})("onRate",function(o){return n.rateSerie(o)})("onMediaSelect",function(o){return n.openSeriesDetails(o,"popular")}),e.qZA()()(),e.TgZ(6,"div",5)(7,"div",2),e._uU(8,"On Air"),e.qZA(),e.TgZ(9,"div",3)(10,"app-carousel",4),e.NdJ("onAddFavorite",function(o){return n.addFavorite(o)})("onAddToWatchlist",function(o){return n.addToWatchlist(o)})("getNewSlides",function(o){return n.getNextPage("nowPlaying",o)})("onRate",function(o){return n.rateSerie(o)})("onMediaSelect",function(o){return n.openSeriesDetails(o,"nowPlaying")}),e.qZA()()(),e.TgZ(11,"div",6)(12,"div",2),e._uU(13,"Top Rated"),e.qZA(),e.TgZ(14,"div",3)(15,"app-carousel",4),e.NdJ("onAddFavorite",function(o){return n.addFavorite(o)})("onAddToWatchlist",function(o){return n.addToWatchlist(o)})("getNewSlides",function(o){return n.getNextPage("topRated",o)})("onRate",function(o){return n.rateSerie(o)})("onMediaSelect",function(o){return n.openSeriesDetails(o,"topRated")}),e.qZA()()(),e.TgZ(16,"div",7)(17,"div",2),e._uU(18,"Airing Today"),e.qZA(),e.TgZ(19,"div",3)(20,"app-carousel",4),e.NdJ("onAddFavorite",function(o){return n.addFavorite(o)})("onAddToWatchlist",function(o){return n.addToWatchlist(o)})("getNewSlides",function(o){return n.getNextPage("upcoming",o)})("onRate",function(o){return n.rateSerie(o)})("onMediaSelect",function(o){return n.openSeriesDetails(o,"upcoming")}),e.qZA()()()()),2&t&&(e.xp6(5),e.Q6J("slidesPagePair",e.WLB(8,_,n.currentPopularPage,n.popular$))("mediaType","serie"),e.xp6(5),e.Q6J("slidesPagePair",e.WLB(11,_,n.currentOnTheAirPage,n.onTheAir$))("mediaType","serie"),e.xp6(5),e.Q6J("slidesPagePair",e.WLB(14,_,n.currentTopRatedPage,n.topRated$))("mediaType","serie"),e.xp6(5),e.Q6J("slidesPagePair",e.WLB(17,_,n.currentAiringTodayPage,n.airingToday$))("mediaType","serie"))},dependencies:[A.F],styles:[".series[_ngcontent-%COMP%]{display:flex;flex-direction:column;gap:40px;padding:16px}.series[_ngcontent-%COMP%]   .list[_ngcontent-%COMP%]{width:100%;display:flex;justify-content:center}.series[_ngcontent-%COMP%]   .divider[_ngcontent-%COMP%]{height:0;width:90%;margin:0 70px;border:1px solid white}.series[_ngcontent-%COMP%]   .upcoming[_ngcontent-%COMP%]{margin-bottom:32px}.series[_ngcontent-%COMP%]   .title[_ngcontent-%COMP%]{font-size:36px;font-weight:500;margin:16px 115px;-webkit-user-select:none;user-select:none}"]}),i})();var b=r(7579),v=r(1135),f=r(2722),D=r(2532),w=r(7384);function Z(i,c){if(1&i&&(e.TgZ(0,"div",11),e._UZ(1,"img",12),e.qZA()),2&i){const t=c.$implicit;e.xp6(1),e.Q6J("src","https://image.tmdb.org/t/p/original"+t.logo_path,e.LSH)}}function W(i,c){if(1&i&&(e.TgZ(0,"div",7)(1,"h2"),e._uU(2,"Where to watch"),e.qZA(),e.TgZ(3,"div",8)(4,"div",9),e.YNc(5,Z,2,1,"div",10),e.qZA()()()),2&i){const t=e.oxw().ngIf;e.xp6(5),e.Q6J("ngForOf",null==t?null:t.providers)}}function $(i,c){if(1&i&&(e.TgZ(0,"div",16)(1,"a",17),e._UZ(2,"app-circle",18),e.TgZ(3,"div",19),e._uU(4),e.qZA()(),e.TgZ(5,"div",20),e._uU(6),e.qZA()()),2&i){const t=c.$implicit;e.xp6(1),e.Q6J("href","https://www.themoviedb.org/person/"+t.id,e.LSH),e.xp6(1),e.Q6J("image",t.profile_path?"https://image.tmdb.org/t/p/original"+t.profile_path:"")("color",t.profile_path?"":"blue"),e.xp6(2),e.hij(" ",t.name," "),e.xp6(2),e.hij(" ",t.character," ")}}const N=function(i){return{center:i}};function R(i,c){if(1&i&&(e.TgZ(0,"div",13)(1,"h2"),e._uU(2,"Main Cast"),e.qZA(),e.TgZ(3,"div",14)(4,"div",9),e.YNc(5,$,7,5,"div",15),e.qZA()()()),2&i){const t=e.oxw().ngIf;e.xp6(3),e.Q6J("ngClass",e.VKq(2,N,t.credits.cast.length<10)),e.xp6(2),e.Q6J("ngForOf",null==t.credits?null:t.credits.cast)}}function J(i,c){if(1&i){const t=e.EpF();e.TgZ(0,"div",1)(1,"div",2)(2,"app-card",3),e.NdJ("onAddFavorite",function(a){e.CHM(t);const o=e.oxw();return e.KtG(o.addFavorite(a))})("onRate",function(a){e.CHM(t);const o=e.oxw();return e.KtG(o.rateMovie(a))})("onAddToWatchlist",function(a){e.CHM(t);const o=e.oxw();return e.KtG(o.addToWatchlist(a))}),e.qZA()(),e.TgZ(3,"div",4),e.YNc(4,W,6,1,"div",5),e.YNc(5,R,6,4,"div",6),e.qZA()()}if(2&i){const t=c.ngIf,n=e.oxw();e.xp6(2),e.Q6J("media",n.serie$)("isThumbnail",!1),e.xp6(2),e.Q6J("ngIf",t.providers&&t.providers.length>0),e.xp6(1),e.Q6J("ngIf",t.credits)}}let u=(()=>{class i{constructor(t,n){this.activatedRoute=t,this.store=n,this.unsubscribe$=new b.x,this.serie$=new v.X(void 0),this.categoryIdPair$=new v.X({id:0,category:""})}ngOnInit(){this.activatedRoute.params.pipe((0,f.R)(this.unsubscribe$)).subscribe(({id:t,category:n})=>{this.categoryIdPair$.next({id:t,category:n}),this.store.dispatch(s.F.loadSerieDetails({id:t,category:n??"popular"})),this.store.dispatch(s.F.loadSerieProviders({id:t})),this.store.dispatch(s.F.loadSerieCast({id:t}))}),this.store.select((0,d.ID)(this.categoryIdPair$.getValue().id)).pipe((0,f.R)(this.unsubscribe$)).subscribe(t=>{t||(this.store.dispatch(s.F.loadSerieDetails(Object.assign({},this.categoryIdPair$.getValue()))),this.store.dispatch(s.F.loadSerieProviders({id:this.categoryIdPair$.getValue().id}))),this.serie$.next(t)})}ngOnDestroy(){this.unsubscribe$.next(),this.unsubscribe$.complete(),this.categoryIdPair$.complete(),this.serie$.complete()}rateMovie(t){this.store.dispatch(s.F.rateSerie({rating:t.rating,id:t.id}))}addToWatchlist(t){this.store.dispatch(s.F.addToWatchlist({data:{request:t}})),t.watchlist||this.store.dispatch(s.F.removeFromWatchlist({id:t.media_id}))}addFavorite(t){this.store.dispatch(s.F.addFavorite({data:{request:t}})),t.favorite||this.store.dispatch(s.F.removeFavorite({id:t.media_id}))}}return i.\u0275fac=function(t){return new(t||i)(e.Y36(g.gz),e.Y36(h.yh))},i.\u0275cmp=e.Xpm({type:i,selectors:[["app-series-details"]],decls:2,vars:3,consts:[["class","details",4,"ngIf"],[1,"details"],[1,"header"],[3,"media","isThumbnail","onAddFavorite","onRate","onAddToWatchlist"],[1,"bottom"],["class","providers",4,"ngIf"],["class","cast",4,"ngIf"],[1,"providers"],[1,"container-wrapper"],[1,"container"],["class","logo",4,"ngFor","ngForOf"],[1,"logo"],["alt","logo",3,"src"],[1,"cast"],[1,"container-wrapper",3,"ngClass"],["class","actor",4,"ngFor","ngForOf"],[1,"actor"],["target","_blank",3,"href"],[3,"image","color"],[1,"name"],[1,"character"]],template:function(t,n){1&t&&(e.YNc(0,J,6,4,"div",0),e.ALo(1,"async")),2&t&&e.Q6J("ngIf",e.lcZ(1,1,n.serie$))},dependencies:[p.mk,p.sg,p.O5,D.A,w.H,p.Ov],styles:[".details[_ngcontent-%COMP%]{display:flex;flex-direction:column;padding:38px 38px 100px;height:100%}.details[_ngcontent-%COMP%]   .header[_ngcontent-%COMP%]{display:flex;justify-content:center}.details[_ngcontent-%COMP%]   .bottom[_ngcontent-%COMP%]{display:flex;flex-direction:column;margin-top:12%;gap:32px}.details[_ngcontent-%COMP%]   .bottom[_ngcontent-%COMP%]   .providers[_ngcontent-%COMP%]{margin-left:32px}.details[_ngcontent-%COMP%]   .bottom[_ngcontent-%COMP%]   .providers[_ngcontent-%COMP%]   .container-wrapper[_ngcontent-%COMP%]{display:flex;justify-content:center;align-items:center;overflow-x:auto}.details[_ngcontent-%COMP%]   .bottom[_ngcontent-%COMP%]   .providers[_ngcontent-%COMP%]   .container-wrapper[_ngcontent-%COMP%]   .container[_ngcontent-%COMP%]{display:flex;gap:32px;justify-content:center;align-items:flex-start;padding:24px 0}.details[_ngcontent-%COMP%]   .bottom[_ngcontent-%COMP%]   .providers[_ngcontent-%COMP%]   .container-wrapper[_ngcontent-%COMP%]   .container[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]{border-radius:20px}.details[_ngcontent-%COMP%]   .bottom[_ngcontent-%COMP%]   .cast[_ngcontent-%COMP%]{margin-left:32px;color:#fff;display:flex;flex-direction:column;gap:8px}.details[_ngcontent-%COMP%]   .bottom[_ngcontent-%COMP%]   .cast[_ngcontent-%COMP%]   .container-wrapper[_ngcontent-%COMP%]{display:flex;overflow-x:auto}.details[_ngcontent-%COMP%]   .bottom[_ngcontent-%COMP%]   .cast[_ngcontent-%COMP%]   .container-wrapper.center[_ngcontent-%COMP%]{display:flex;justify-content:center}.details[_ngcontent-%COMP%]   .bottom[_ngcontent-%COMP%]   .cast[_ngcontent-%COMP%]   .container-wrapper[_ngcontent-%COMP%]   .container[_ngcontent-%COMP%]{display:flex;gap:32px;justify-content:center;align-items:flex-start;padding:24px 16px}.details[_ngcontent-%COMP%]   .bottom[_ngcontent-%COMP%]   .cast[_ngcontent-%COMP%]   .container-wrapper[_ngcontent-%COMP%]   .container[_ngcontent-%COMP%]   .actor[_ngcontent-%COMP%]{display:flex;flex-direction:column;justify-content:center;align-items:center;gap:8px}.details[_ngcontent-%COMP%]   .bottom[_ngcontent-%COMP%]   .cast[_ngcontent-%COMP%]   .container-wrapper[_ngcontent-%COMP%]   .container[_ngcontent-%COMP%]   .actor[_ngcontent-%COMP%]:hover{cursor:pointer;transition:ease-in-out .2s;transform:scale(1.1)}.details[_ngcontent-%COMP%]   .bottom[_ngcontent-%COMP%]   .cast[_ngcontent-%COMP%]   .container-wrapper[_ngcontent-%COMP%]   .container[_ngcontent-%COMP%]   .actor[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]{font-size:16px;font-weight:700;text-decoration:none;color:#fff;text-align:center;width:100%}.details[_ngcontent-%COMP%]   .bottom[_ngcontent-%COMP%]   .cast[_ngcontent-%COMP%]   .container-wrapper[_ngcontent-%COMP%]   .container[_ngcontent-%COMP%]   .actor[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]:hover{color:#ffc107;cursor:pointer;transition:ease-in-out .2s}.details[_ngcontent-%COMP%]   .bottom[_ngcontent-%COMP%]   .cast[_ngcontent-%COMP%]   .container-wrapper[_ngcontent-%COMP%]   .container[_ngcontent-%COMP%]   .actor[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]:active{color:#f2b500}.details[_ngcontent-%COMP%]   .bottom[_ngcontent-%COMP%]   .cast[_ngcontent-%COMP%]   .container-wrapper[_ngcontent-%COMP%]   .container[_ngcontent-%COMP%]   .actor[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]   .name[_ngcontent-%COMP%]{text-align:center}.details[_ngcontent-%COMP%]   .bottom[_ngcontent-%COMP%]   .cast[_ngcontent-%COMP%]   .container-wrapper[_ngcontent-%COMP%]   .container[_ngcontent-%COMP%]   .actor[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]   .character[_ngcontent-%COMP%], .details[_ngcontent-%COMP%]   .bottom[_ngcontent-%COMP%]   .cast[_ngcontent-%COMP%]   .container-wrapper[_ngcontent-%COMP%]   .container[_ngcontent-%COMP%]   .actor[_ngcontent-%COMP%]   .character[_ngcontent-%COMP%]{font-size:14px;font-weight:300}"]}),i})();var m=r(5200);const I=[{path:"",component:P,resolve:{prefetch:m.V}},{path:":id",component:u,resolve:{prefetch:m.V}},{path:":category/:id",component:u,resolve:{prefetch:m.V}}];let Q=(()=>{class i{}return i.\u0275fac=function(t){return new(t||i)},i.\u0275mod=e.oAB({type:i}),i.\u0275inj=e.cJS({imports:[g.Bz.forChild(I),g.Bz]}),i})();var j=r(5055),U=r(278),M=r(9420),B=r(5884);const Y=[p.ez,Q,F.m,h.Aw.forFeature(M.W5,M.H5),T.sQ.forFeature([S.i,U._]),O.JF],z=[j._,B.I];let H=(()=>{class i{}return i.\u0275fac=function(t){return new(t||i)},i.\u0275mod=e.oAB({type:i}),i.\u0275inj=e.cJS({providers:[...z],imports:[Y]}),i})()}}]);