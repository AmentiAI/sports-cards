"use strict";(()=>{var e={};e.id=613,e.ids=[613],e.modules={517:e=>{e.exports=require("next/dist/compiled/next-server/app-route.runtime.prod.js")},1135:(e,r,a)=>{a.r(r),a.d(r,{headerHooks:()=>m,originalPathname:()=>E,patchFetch:()=>h,requestAsyncStorage:()=>l,routeModule:()=>p,serverHooks:()=>$,staticGenerationAsyncStorage:()=>g,staticGenerationBailout:()=>_});var t={};a.r(t),a.d(t,{GET:()=>u,POST:()=>d});var s=a(5419),n=a(9108),o=a(9678),c=a(8070),i=a(7802);async function u(e){try{let{searchParams:r}=new URL(e.url),a=r.get("category"),t=r.get("search"),s=r.get("minPrice"),n=r.get("maxPrice"),o=r.get("limit"),u=r.get("offset"),d="true"===r.get("count"),p=`
      SELECT 
        id, name, player, team, year, brand, set_name as "set", 
        card_number as "cardNumber", category, condition, 
        card_type as "cardType", status, digital_price as "digitalPrice", 
        physical_price as "physicalPrice", price, description, 
        image_url as "imageUrl", back_image_url as "backImageUrl", 
        digital_asset_id as "digitalAssetId", current_owner_id as "currentOwnerId",
        is_listed as "isListed", is_sold as "isSold", created_at, updated_at
      FROM sports_cards 
      WHERE 1=1
    `;d&&(p="SELECT COUNT(*) as count FROM sports_cards WHERE 1=1");let l=[],g=0;a&&(g++,p+=` AND category = $${g}`,l.push(a)),t&&(g++,p+=` AND (
        LOWER(player) LIKE $${g} OR 
        LOWER(team) LIKE $${g} OR 
        LOWER(name) LIKE $${g} OR 
        LOWER(brand) LIKE $${g} OR 
        LOWER(set_name) LIKE $${g}
      )`,l.push(`%${t.toLowerCase()}%`)),s&&(g++,p+=` AND price >= $${g}`,l.push(parseFloat(s))),n&&(g++,p+=` AND price <= $${g}`,l.push(parseFloat(n))),!d&&(p+=" ORDER BY price DESC",o&&(g++,p+=` LIMIT $${g}`,l.push(parseInt(o))),u&&(g++,p+=` OFFSET $${g}`,l.push(parseInt(u))));let $=await i.Z.query(p,l);if(d)return c.Z.json({success:!0,count:parseInt($.rows[0].count)});return c.Z.json({success:!0,data:$.rows,count:$.rows.length})}catch(e){return console.error("Error fetching cards:",e),c.Z.json({success:!1,error:"Failed to fetch cards"},{status:500})}}async function d(e){try{let{name:r,player:a,team:t,year:s,brand:n,set:o,cardNumber:u,category:d,condition:p,price:l,description:g,imageUrl:$,backImageUrl:m}=await e.json(),_=`
      INSERT INTO sports_cards (
        name, player, team, year, brand, set_name, card_number,
        category, condition, price, description, image_url, back_image_url
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)
      RETURNING *
    `,E=await i.Z.query(_,[r,a,t,s,n,o,u,d,p,l,g,$||null,m||null]);return c.Z.json({success:!0,data:E.rows[0]})}catch(e){return console.error("Error creating card:",e),c.Z.json({success:!1,error:"Failed to create card"},{status:500})}}let p=new s.AppRouteRouteModule({definition:{kind:n.x.APP_ROUTE,page:"/api/cards/route",pathname:"/api/cards",filename:"route",bundlePath:"app/api/cards/route"},resolvedPagePath:"C:\\Users\\Wilso\\sports-cards\\app\\api\\cards\\route.ts",nextConfigOutput:"standalone",userland:t}),{requestAsyncStorage:l,staticGenerationAsyncStorage:g,serverHooks:$,headerHooks:m,staticGenerationBailout:_}=p,E="/api/cards/route";function h(){return(0,o.patchFetch)({serverHooks:$,staticGenerationAsyncStorage:g})}},7802:(e,r,a)=>{a.d(r,{Z:()=>n});let t=require("pg"),s={connectionString:process.env.DBCONN||"postgresql://neondb_owner:npg_5kSxy9JHIYGg@ep-fancy-poetry-adzths0u-pooler.c-2.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require",ssl:{rejectUnauthorized:!1}},n=new t.Pool(s)}};var r=require("../../../webpack-runtime.js");r.C(e);var a=e=>r(r.s=e),t=r.X(0,[638,206],()=>a(1135));module.exports=t})();