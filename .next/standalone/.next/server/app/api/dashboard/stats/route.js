"use strict";(()=>{var e={};e.id=41,e.ids=[41],e.modules={517:e=>{e.exports=require("next/dist/compiled/next-server/app-route.runtime.prod.js")},4300:e=>{e.exports=require("buffer")},6113:e=>{e.exports=require("crypto")},2781:e=>{e.exports=require("stream")},3837:e=>{e.exports=require("util")},4435:(e,s,r)=>{r.r(s),r.d(s,{headerHooks:()=>h,originalPathname:()=>C,patchFetch:()=>f,requestAsyncStorage:()=>E,routeModule:()=>p,serverHooks:()=>g,staticGenerationAsyncStorage:()=>_,staticGenerationBailout:()=>N});var t={};r.r(t),r.d(t,{GET:()=>c});var a=r(5419),o=r(9108),n=r(9678),i=r(8070),d=r(6082),u=r.n(d),l=r(7802);async function c(e){try{let s=e.headers.get("authorization");if(!s||!s.startsWith("Bearer "))return i.Z.json({success:!1,message:"No token provided"},{status:401});let r=s.substring(7);try{let e=u().verify(r,process.env.JWT_SECRET||"fallback-secret").userId,[s,t,a,o,n]=await Promise.all([l.Z.query(`
          SELECT COUNT(*) as total_cards,
                 COUNT(CASE WHEN is_listed = true THEN 1 END) as listed_cards,
                 COUNT(CASE WHEN status = 'sold' THEN 1 END) as sold_cards
          FROM digital_card_ownership dco
          JOIN sports_cards sc ON dco.card_id = sc.id
          WHERE dco.user_id = $1
        `,[e]),l.Z.query(`
          SELECT balance FROM user_wallets WHERE user_id = $1
        `,[e]),l.Z.query(`
          SELECT COALESCE(SUM(amount), 0) as total_sales
          FROM transactions
          WHERE seller_id = $1 AND status = 'completed' AND transaction_type = 'sale'
        `,[e]),l.Z.query(`
          SELECT COUNT(*) as active_listings
          FROM marketplace_listings
          WHERE user_id = $1 AND is_active = true AND (expires_at IS NULL OR expires_at > NOW())
        `,[e]),l.Z.query(`
          SELECT COUNT(*) as pending_offers
          FROM trade_offers
          WHERE receiver_id = $1 AND status = 'pending'
        `,[e])]),d=s.rows[0],c=t.rows[0],p=a.rows[0],E=o.rows[0],_=n.rows[0],g={totalCards:parseInt(d.total_cards)||0,listedCards:parseInt(d.listed_cards)||0,soldCards:parseInt(d.sold_cards)||0,walletBalance:parseFloat(c?.balance)||0,totalSales:parseFloat(p.total_sales)||0,activeListings:parseInt(E.active_listings)||0,pendingOffers:parseInt(_.pending_offers)||0};return i.Z.json({success:!0,stats:g})}catch(e){return i.Z.json({success:!1,message:"Invalid token"},{status:401})}}catch(e){return console.error("Dashboard stats error:",e),i.Z.json({success:!1,message:"Internal server error"},{status:500})}}let p=new a.AppRouteRouteModule({definition:{kind:o.x.APP_ROUTE,page:"/api/dashboard/stats/route",pathname:"/api/dashboard/stats",filename:"route",bundlePath:"app/api/dashboard/stats/route"},resolvedPagePath:"C:\\Users\\Wilso\\sports-cards\\app\\api\\dashboard\\stats\\route.ts",nextConfigOutput:"standalone",userland:t}),{requestAsyncStorage:E,staticGenerationAsyncStorage:_,serverHooks:g,headerHooks:h,staticGenerationBailout:N}=p,C="/api/dashboard/stats/route";function f(){return(0,n.patchFetch)({serverHooks:g,staticGenerationAsyncStorage:_})}},7802:(e,s,r)=>{r.d(s,{Z:()=>o});let t=require("pg"),a={connectionString:process.env.DBCONN||"postgresql://neondb_owner:npg_5kSxy9JHIYGg@ep-fancy-poetry-adzths0u-pooler.c-2.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require",ssl:{rejectUnauthorized:!1}},o=new t.Pool(a)}};var s=require("../../../../webpack-runtime.js");s.C(e);var r=e=>s(s.s=e),t=s.X(0,[638,206,82],()=>r(4435));module.exports=t})();