<!-- ABOUT THE PROJECT -->
## About The Project

This project is consists of a next.js based theme for WooCommerce.

[Live Preview](https://hoshop-nextgen.vercel.app/)


Features:
* Register
* Login
* Logout
* Add to cart
* Stripe payments
* Static pages for super fast load times
* Many more

This website features jwt token authentication for security.



### Built With

Those are the frameworks/libraries used to build this website client.

* [Next.js](https://nextjs.org/)
* [Apollo Client](https://www.apollographql.com/docs/react/)
* [Sass](https://sass-lang.com/)
* [WooCommerce](https://woocommerce.com/)
* [Stripe](https://stripe.com/docs/api)


### Client setup
1. Server Side Enviromnent Variables.
Edit .env.development file as follows:
 
- `NEXT_PUBLIC_API_URL=https://example.com`
- `NEXT_PUBLIC_WEBSITE_TITLE='Your store name'`

Env variables from these file will be consumed by Apollo client on client side.

### WordPress Setup
1. On your WordPress site, download, Upload and activate all the plugins from wordpress/plugins folder of this repo, into your WordPress Site.

a. [Headless CMS](https://github.com/imranhsayed/gatsby-woocommerce-themes/blob/master/wordpress/plugins/headless-cms.zip)

b. [woocommerce](https://github.com/imranhsayed/gatsby-woocommerce-themes/blob/master/wordpress/plugins/woocommerce.4.4.1.zip)

c. [wp-graphql](https://github.com/imranhsayed/gatsby-woocommerce-themes/blob/master/wordpress/plugins/wp-graphql.zip) - tested on ( v1.0.0 )

d. [wp-graphql-woocommerce](https://github.com/imranhsayed/gatsby-woocommerce-themes/blob/master/wordpress/plugins/wp-graphql-woocommerce.zip)

e. [wp-gatsby](https://github.com/imranhsayed/gatsby-woocommerce-themes/blob/master/wordpress/plugins/wp-gatsby.zip)

f. [Yoast-SEO](https://github.com/imranhsayed/gatsby-woocommerce-themes/blob/master/wordpress/plugins/wordpress-seo.14.5.zip)

g. [wp-graphql-yoast-seo](https://github.com/imranhsayed/gatsby-woocommerce-themes/blob/master/wordpress/plugins/wp-graphql-yoast-seo.zip)

h. [wp-graphql-jwt-authentication](https://github.com/imranhsayed/gatsby-woocommerce-themes/blob/master/wordpress/plugins/wp-graphql-jwt-authentication.zip)

* You can follow the readme to setup [https://github.com/wp-graphql/wp-graphql-jwt-authentication#install-activate--setup](https://github.com/wp-graphql/wp-graphql-jwt-authentication#install-activate--setup)
