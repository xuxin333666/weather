requirejs.config({
    baseUrl: 'JavaScript/config',
    paths: {
        'JavaScript': '..',
        'jquery': '../library/jquery-3.3.1.min',
        'lib': '../library'
    }
})
requirejs(['../index'])