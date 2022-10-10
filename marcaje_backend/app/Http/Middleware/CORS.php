<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class CORS
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure(\Illuminate\Http\Request): (\Illuminate\Http\Response|\Illuminate\Http\RedirectResponse)  $next
     * @return \Illuminate\Http\Response|\Illuminate\Http\RedirectResponse
     */
    
    public function handle(Request $request, Closure $next)
    {
        // agregamos los encabezados
        $allowedOrigins = [env('FRONTEND_ENDPOINT', 'http://localhost:8080'), env('WORDPRESS_ENDPOINT', 'http://localhost'), env('EXTRA_ENDPOINT', 'http://127.0.0.1')];

        if($request->server('HTTP_ORIGIN')){
          if (in_array($request->server('HTTP_ORIGIN'), $allowedOrigins)) {
              return $next($request)
                  ->header('Access-Control-Allow-Origin', $request->server('HTTP_ORIGIN'))
                  ->header('Access-Control-Allow-Origin', '*')
                  ->header('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT, DELETE')
                  ->header('Access-Control-Allow-Headers', 'Content-Type, X-Auth-Token, Authorization, Origin')
                  ->header('Access-Control-Allow-Credentials', 'true');
          }
        }
      
        return $next($request);
    }
}
