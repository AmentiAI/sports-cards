"use strict";(()=>{var e={};e.id=815,e.ids=[815],e.modules={517:e=>{e.exports=require("next/dist/compiled/next-server/app-route.runtime.prod.js")},9958:(e,r,s)=>{s.r(r),s.d(r,{headerHooks:()=>y,originalPathname:()=>h,patchFetch:()=>f,requestAsyncStorage:()=>g,routeModule:()=>p,serverHooks:()=>m,staticGenerationAsyncStorage:()=>_,staticGenerationBailout:()=>E});var a={};s.r(a),s.d(a,{DELETE:()=>l,GET:()=>c,PUT:()=>u});var t=s(5419),n=s(9108),o=s(9678),i=s(8070),d=s(7802);async function c(e,{params:r}){try{let e=r.id,s=`
      SELECT 
        id, name, player, team, year, brand, set_name as "set", 
        card_number as "cardNumber", category, condition, 
        card_type as "cardType", status, digital_price as "digitalPrice", 
        physical_price as "physicalPrice", price, description, 
        image_url as "imageUrl", back_image_url as "backImageUrl", 
        digital_asset_id as "digitalAssetId", current_owner_id as "currentOwnerId",
        is_listed as "isListed", is_sold as "isSold", created_at, updated_at
      FROM sports_cards 
      WHERE id = $1
    `,a=await d.Z.query(s,[e]);if(0===a.rows.length)return i.Z.json({success:!1,error:"Card not found"},{status:404});return i.Z.json({success:!0,data:a.rows[0]})}catch(e){return console.error("Error fetching card:",e),i.Z.json({success:!1,error:"Failed to fetch card"},{status:500})}}async function u(e,{params:r}){try{let s=r.id,{name:a,player:t,team:n,year:o,brand:c,set:u,cardNumber:l,category:p,condition:g,price:_,description:m,imageUrl:y,backImageUrl:E,isSold:h}=await e.json(),f=`
      UPDATE sports_cards SET
        name = $1, player = $2, team = $3, year = $4, brand = $5, 
        set_name = $6, card_number = $7, category = $8, condition = $9, 
        price = $10, description = $11, image_url = $12, back_image_url = $13, 
        is_sold = $14, updated_at = CURRENT_TIMESTAMP
      WHERE id = $15
      RETURNING *
    `,$=await d.Z.query(f,[a,t,n,o,c,u,l,p,g,_,m,y||null,E||null,h||!1,s]);if(0===$.rows.length)return i.Z.json({success:!1,error:"Card not found"},{status:404});return i.Z.json({success:!0,data:$.rows[0]})}catch(e){return console.error("Error updating card:",e),i.Z.json({success:!1,error:"Failed to update card"},{status:500})}}async function l(e,{params:r}){try{let e=r.id,s=await d.Z.query("DELETE FROM sports_cards WHERE id = $1 RETURNING id",[e]);if(0===s.rows.length)return i.Z.json({success:!1,error:"Card not found"},{status:404});return i.Z.json({success:!0,message:"Card deleted successfully"})}catch(e){return console.error("Error deleting card:",e),i.Z.json({success:!1,error:"Failed to delete card"},{status:500})}}let p=new t.AppRouteRouteModule({definition:{kind:n.x.APP_ROUTE,page:"/api/cards/[id]/route",pathname:"/api/cards/[id]",filename:"route",bundlePath:"app/api/cards/[id]/route"},resolvedPagePath:"C:\\Users\\Wilso\\sports-cards\\app\\api\\cards\\[id]\\route.ts",nextConfigOutput:"standalone",userland:a}),{requestAsyncStorage:g,staticGenerationAsyncStorage:_,serverHooks:m,headerHooks:y,staticGenerationBailout:E}=p,h="/api/cards/[id]/route";function f(){return(0,o.patchFetch)({serverHooks:m,staticGenerationAsyncStorage:_})}},7802:(e,r,s)=>{s.d(r,{Z:()=>n});let a=require("pg"),t={connectionString:process.env.DBCONN||"postgresql://neondb_owner:npg_5kSxy9JHIYGg@ep-fancy-poetry-adzths0u-pooler.c-2.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require",ssl:{rejectUnauthorized:!1}},n=new a.Pool(t)}};var r=require("../../../../webpack-runtime.js");r.C(e);var s=e=>r(r.s=e),a=r.X(0,[638,206],()=>s(9958));module.exports=a})();