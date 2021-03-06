// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('donacion', [
  'ionic',
  'ngResource',
  'LocalStorageModule',
  'angular-loading-bar',
  'angular-jwt',
  'ngTouch',
  'ngAnimate',
  'ui.bootstrap',
  'file-model',
  'base64',
  'flow',
  'ngVideo',
  'uiGmapgoogle-maps',
  'socialLogin',
  'ngNotify'
  ])

  .run(function (AuthService, ngNotify, $rootScope, $state, LoginModal, LogoffService) {

    ngNotify.addTheme('custom', 'light-bootstrap');

    ngNotify.config({
      theme: 'custom',
      position: 'bottom',
      duration: 3000,
      type: 'info',
      sticky: false,
      button: true,
      html: true
    });


    $rootScope.$on('event:social-sign-in-success', function(event, userDetails){
      AuthService.loginSocial(userDetails.token, userDetails.provider)
    });

    $rootScope.$on('$stateChangeStart', function(event, toState) {

      if (toState.data && toState.data.requireLogin) {

        AuthService.isLogged()
          .then(function () {
            return $state.go(toState.name);
          })
          .catch(function () {
            LogoffService.logoff().then(function () {
              LoginModal();
            });
          });
      }
    })
  })

  .config(function($stateProvider, $urlRouterProvider, socialProvider, $httpProvider, $resourceProvider, cfpLoadingBarProvider, uiGmapGoogleMapApiProvider) {

    $httpProvider.defaults.xsrfCookieName = 'csrftoken';
    $httpProvider.defaults.xsrfHeaderName = 'X-CSRFToken';
    $httpProvider.interceptors.push('APIInterceptor');

    $resourceProvider.defaults.stripTrailingSlashes = false;

    $urlRouterProvider.otherwise( function($injector) {
      var $state = $injector.get("$state");
      $state.transitionTo("home.inicio");
    });

    cfpLoadingBarProvider.parentSelector = '#loading-bar-container';
    cfpLoadingBarProvider.spinnerTemplate = '<span class="fa fa-spinner fa-pulse fa-lg fa-fw"></span>&nbsp;&nbsp;Cargando...';

    uiGmapGoogleMapApiProvider.configure({
      key: 'AIzaSyBtTbhkqxMoIrLrDxlvUTI-cOCvesNX8zQ',
      v: '3.25',
      libraries: 'weather,geometry,visualization'
    });

    socialProvider.setFbKey({appId: "299809130392810", apiVersion: "v2.7"});

    $stateProvider

      .state('404notfound', {
        cache: false,
        url: "/404nf",
        templateUrl: "templates/404.html",
      })

      .state('home', {
        cache: false,
        url: "/",
        abstract: true,
        templateUrl: "templates/home/nav-home.html",
        controller: "NavHomeController"
      })

      .state('home.inicio', {
        cache: false,
        url: "home",
        views: {
          "homeContent": {
            templateUrl: "templates/home/inicio.html"
          }
        }
      })

      .state('home.sangre', {
        cache: false,
        url: "sangre",
        views: {
          "homeContent": {
            templateUrl: "templates/home/sangre.html"
          }
        }
      })

      .state('home.sangre-funcion', {
        cache: false,
        url: "sangre-funcion",
        views: {
          "homeContent": {
            templateUrl: "templates/home/sangre-funcion.html"
          }
        }
      })

      .state('home.grupos-sanguineos', {
        cache: false,
        url: "grupos-sanguineos",
        views: {
          "homeContent": {
            templateUrl: "templates/home/grupos-sanguineos-info.html"
          }
        }
      })

      .state('home.tratamiento-sangre', {
        cache: false,
        url: "tratamiento-sangre",
        views: {
          "homeContent": {
            templateUrl: "templates/home/tratamiento-sangre.html"
          }
        }
      })

      .state('home.quienes-donan', {
        cache: false,
        url: "quienes-donan",
        views: {
          "homeContent": {
            templateUrl: "templates/home/quienes-donan.html"
          }
        }
      })

      .state('home.donde-donar', {
        cache: false,
        url: "donde-donar",
        views: {
          "homeContent": {
            templateUrl: "templates/home/donde-donar.html",
            controller: "CentrosDonacionController"
          }
        }
      })

      .state('home.activar-cuenta-clave', {
        cache: false,
        url: "activar-cuenta-clave",
        views: {
          "homeContent": {
            templateUrl: "templates/home/activar-cuenta-clave.html",
            controller: "ActivarCuentaClaveController"
          }
        }
      })

      .state('home.activar-cuenta', {
        cache: false,
        url: "activar-cuenta/:token",
        views: {
          "homeContent": {
            templateUrl: "templates/home/activar-cuenta.html",
            controller: "ActivarCuentaController"
          }
        }
      })

      .state('home.registro-exito', {
        cache: false,
        url: "registro-exito",
        views: {
          "homeContent": {
            templateUrl: "templates/cuentas/registro-exito.html",
          }
        }
      })

      .state('home.reset-pass', {
        cache: false,
        url: "reset-password/:token",
        views: {
          "homeContent": {
            templateUrl: "templates/cuentas/reset-pass.html",
            controller: "ResetPassController"
          }
        }
      })

      .state('dashboard', {
        cache: false,
        url: "/dashboard",
        abstract: true,
        templateUrl: "templates/nav-dashboard.html",
        controller: "NavDashboardController",
        data: {
          requireLogin: true
        }
      })

      .state('dashboard.perfil', {
        cache: false,
        url: "/perfil",
        views: {
          "dashboardContent": {
            templateUrl: "templates/donantes/perfil.html",
            controller: "ProfileController"
          }
        }
      })

      .state('dashboard.perfil-edit', {
        cache: false,
        url: "/perfil/edit",
        views: {
          "dashboardContent": {
            templateUrl: "templates/donantes/perfil-edit.html",
            controller: "ProfileEditController"
          }
        }
      })

      .state('dashboard.libreta', {
        cache: false,
        url: "/libreta",
        views: {
          "dashboardContent": {
            templateUrl: "templates/donaciones/libreta-donacion.html",
            controller: "LibretaController"
          }
        }
      })

      .state('dashboard.registrar-donacion', {
        cache: false,
        url: "/donacion/registro",
        views: {
          "dashboardContent": {
            templateUrl: "templates/donaciones/registrar-donacion.html",
            controller: "RegistrarDonacionController"
          }
        }
      })

      .state('dashboard.editar-donacion', {
        cache: false,
        url: "/donacion/editar/:donacionID",
        views: {
          "dashboardContent": {
            templateUrl: "templates/donaciones/editar-donacion.html",
            controller: "EditarDonacionController"
          }
        }
      })

      .state('dashboard.listado-eventos', {
        cache: false,
        url: "/listado-eventos",
        views: {
          "dashboardContent": {
            templateUrl: "templates/eventos/listado-eventos.html",
            controller: "EventosController",
          }
        }
      })

      .state('dashboard.detalle-evento', {
        cache: false,
        url: "/evento/:eventoID",
        views: {
          "dashboardContent": {
            templateUrl: "templates/eventos/detalle-evento.html",
            controller: "DetalleEventoController",
          }
        }
      })

      .state('dashboard.listado-centros', {
        cache: false,
        url: "/listado-centros",
        views: {
          "dashboardContent": {
            templateUrl: "templates/centros/listado-centros.html",
            controller: "CentrosDonacionController",
          }
        }
      })

      .state('dashboard.detalle-centro', {
        cache: false,
        url: "/centro-donacion/:centroID",
        views: {
          "dashboardContent": {
            templateUrl: "templates/centros/detalle-centro.html",
            controller: "DetalleCentroController",
          }
        }
      })

      .state('dashboard.crear-solicitud', {
        cache: false,
        url: "/crear-solicitud",
        views: {
          "dashboardContent": {
            templateUrl: "templates/solicitudes/crear-solicitud.html",
            controller: "CrearSolicitudDonacionController",
          }
        }
      })
      .state('dashboard.detalle-solicitud', {
        cache: false,
        url: "/solicitud/:solicitudID",
        views: {
          "dashboardContent": {
            templateUrl: "templates/solicitudes/detalle-solicitud.html",
            controller: "DetalleSolicitudController",
          }
        }
      })
      .state('dashboard.listado-solicitudes', {
        cache: false,
        url: "/listado-solicitudes",
        views: {
          "dashboardContent": {
            templateUrl: "templates/solicitudes/listado-solicitudes.html",
            controller: "ListadoSolicitudesController",
          }
        }
      })
  });
