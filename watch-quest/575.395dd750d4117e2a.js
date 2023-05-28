"use strict";(self.webpackChunkwatch_quest=self.webpackChunkwatch_quest||[]).push([[575],{4575:(w,p,i)=>{i.r(p),i.d(p,{WatchlistModule:()=>S});var l=i(4755),m=i(2286),h=i(7449),u=i(5200),r=i(5504),f=i(9895),d=i(1535),W=i(6305),t=i(2223),g=i(6789),M=i(1927);const v=function(s,c){return{currentSlidePage:s,slides:c}};function C(s,c){if(1&s){const e=t.EpF();t.TgZ(0,"div",3)(1,"div",4),t._uU(2,"Watchlist Movies"),t.qZA(),t.TgZ(3,"app-carousel",5),t.NdJ("onMediaSelect",function(a){t.CHM(e);const n=t.oxw();return t.KtG(n.openDetails(a,"movies"))})("onRate",function(a){t.CHM(e);const n=t.oxw();return t.KtG(n.rate(a,"movie"))})("onAddFavorite",function(a){t.CHM(e);const n=t.oxw();return t.KtG(n.addFavorite(a,"movie"))})("onAddToWatchlist",function(a){t.CHM(e);const n=t.oxw();return t.KtG(n.addToWatchlist(a,"movie"))}),t.qZA()()}if(2&s){const e=t.oxw();t.xp6(3),t.Q6J("slidesPagePair",t.WLB(2,v,e.currentWatchlistMoviesPage,e.watchlistMovies$))("mediaType","movie")}}function _(s,c){if(1&s){const e=t.EpF();t.TgZ(0,"div",6)(1,"div",4),t._uU(2,"Watchlist Series"),t.qZA(),t.TgZ(3,"app-carousel",5),t.NdJ("onMediaSelect",function(a){t.CHM(e);const n=t.oxw();return t.KtG(n.openDetails(a,"series"))})("onRate",function(a){t.CHM(e);const n=t.oxw();return t.KtG(n.rate(a,"serie"))})("onAddFavorite",function(a){t.CHM(e);const n=t.oxw();return t.KtG(n.addFavorite(a,"serie"))})("onAddToWatchlist",function(a){t.CHM(e);const n=t.oxw();return t.KtG(n.addToWatchlist(a,"serie"))}),t.qZA()()}if(2&s){const e=t.oxw();t.xp6(3),t.Q6J("slidesPagePair",t.WLB(2,v,e.currentWatchlistSeriesPage,e.watchlistSeries$))("mediaType","serie")}}const x=[{path:"",component:(()=>{class s{constructor(e,o){this.store=e,this.router=o,this.currentWatchlistMoviesPage=1,this.currentWatchlistSeriesPage=1}ngOnInit(){this.watchlistMovies$=this.store.select(f.Yo),this.watchlistSeries$=this.store.select(W.C9)}openDetails(e,o){this.store.dispatch(r.X.loadMovieDetails({id:e,category:"popular"})),this.store.dispatch(r.X.loadMovieProviders({id:e})),this.router.navigate([`/cms/${o}`,e])}rate(e,o){this.store.dispatch("movie"===o?r.X.rateMovie(e):d.F.rateSerie(e))}addToWatchlist(e,o){"movie"===o?(this.store.dispatch(r.X.addToWatchlist({data:{request:e}})),e.watchlist||this.store.dispatch(r.X.removeFromWatchlist({id:e.media_id}))):(this.store.dispatch(d.F.addToWatchlist({data:{request:e}})),e.watchlist||this.store.dispatch(d.F.removeFromWatchlist({id:e.media_id})))}addFavorite(e,o){"movie"===o?(this.store.dispatch(r.X.addFavorite({data:{request:e}})),e.favorite||this.store.dispatch(r.X.removeFavorite({id:e.media_id}))):(this.store.dispatch(d.F.addFavorite({data:{request:e}})),e.favorite||this.store.dispatch(d.F.removeFavorite({id:e.media_id})))}}return s.\u0275fac=function(e){return new(e||s)(t.Y36(g.yh),t.Y36(h.F0))},s.\u0275cmp=t.Xpm({type:s,selectors:[["app-watchlist-dashboard"]],decls:5,vars:6,consts:[[1,"watchlist"],["class","movies",4,"ngIf"],["class","series",4,"ngIf"],[1,"movies"],[1,"title"],[3,"slidesPagePair","mediaType","onMediaSelect","onRate","onAddFavorite","onAddToWatchlist"],[1,"series"]],template:function(e,o){1&e&&(t.TgZ(0,"div",0),t.YNc(1,C,4,5,"div",1),t.ALo(2,"async"),t.YNc(3,_,4,5,"div",2),t.ALo(4,"async"),t.qZA()),2&e&&(t.xp6(1),t.Q6J("ngIf",t.lcZ(2,2,o.watchlistMovies$)),t.xp6(2),t.Q6J("ngIf",t.lcZ(4,4,o.watchlistSeries$)))},dependencies:[l.O5,M.F,l.Ov],styles:[".watchlist[_ngcontent-%COMP%]{padding:16px}.watchlist[_ngcontent-%COMP%]   .movies[_ngcontent-%COMP%], .watchlist[_ngcontent-%COMP%]   .series[_ngcontent-%COMP%]{display:flex;flex-direction:column;justify-content:center;margin-top:32px;align-items:center;gap:16px;width:100%}.watchlist[_ngcontent-%COMP%]   .movies[_ngcontent-%COMP%]   .title[_ngcontent-%COMP%], .watchlist[_ngcontent-%COMP%]   .series[_ngcontent-%COMP%]   .title[_ngcontent-%COMP%]{font-size:36px;font-weight:500;margin:16px 115px;-webkit-user-select:none;user-select:none}"]}),s})(),resolve:{prefetch:u.V}},{path:"**",redirectTo:"watchlist"}];let T=(()=>{class s{}return s.\u0275fac=function(e){return new(e||s)},s.\u0275mod=t.oAB({type:s}),s.\u0275inj=t.cJS({imports:[h.Bz.forChild(x),h.Bz]}),s})();var F=i(278),P=i(2496),A=i(826),D=i(5055),y=i(5884);let S=(()=>{class s{}return s.\u0275fac=function(e){return new(e||s)},s.\u0275mod=t.oAB({type:s}),s.\u0275inj=t.cJS({providers:[y.I,D._],imports:[l.ez,T,m.m,A.sQ.forFeature([P.i,F._])]}),s})()}}]);