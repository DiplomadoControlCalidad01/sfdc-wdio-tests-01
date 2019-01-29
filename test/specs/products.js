const expect=require('chai').expect
  , config=require('../config')
  , commons=require('../core/commons')
  , patterns=require('../core/patterns')
  , Launcher=require('../pages/launcher.po')
  , List=require('../pages/list.po')
  , Login=require('../pages/login.po')
  , credentials=config.credentials.administrator;

describe('products.js',()=>{
    before(()=>{
        Login.loginAs(credentials.username,credentials.password);
    });

    it.only('F001 - Iniciador de Aplicación de salesforce muestra el enlace a '+
       '«Productos»',()=>{
        let launcher=new Launcher().open();

        expect(launcher.exists('Products')).to.equal(true);

        launcher.close();
    });

    it('F002 - Clic en el botón «Nuevo», lanza el formulario de creación de '+
        'producto',()=>{
        let modal_new=Launcher.app('Products').new();

        expect(browser.element(patterns.new.container).value).to.not.be.null;

        modal_new.close();
    });

    it('A001 - Producto es registrado con los valores obligatorios '+
       'establecidos después de accionado el botón «Guardar»',()=>{
        let modal_new=Launcher.app('Products').new()
          , message=modal_new
            .fill({
                name:'TEST A001'
              , year:2019
            })
            .save();

        expect(message.result()).to.equal('success');
        expect(message.text()).to.equal('Product "TEST A001" was created.');

        message.close();
    });

    it('F003 - Producto es registrado con los valores obligatorios '+
        'establecidos después de accionado el botón «Guardar y nuevo»',()=>{
        let modal_new=Launcher.app('Products').new()
          , message=modal_new
            .fill({
                name:'TEST F003'
              , year:2019
            })
            .saveandnew();

        expect(message.result()).to.equal('success');
        expect(message.text()).to.equal('Product "TEST F003" was created.');

        message.close();
    });

/*    it('product new => close',()=>{
        list
            .new()
            .close();

        expect(browser.element(patterns.list.modal).value).to.be.null;
    });

    it('product new => cancel',()=>{
        list
            .new()
            .close();

        expect(browser.element(patterns.list.modal).value).to.be.null;
    });

    it('product new => save',()=>{
        list
            .new()
            .fill({
                name:'Test Product'
              , active:true
              , code:'00001'
              , family:'Ciencia Ficción'
              , quantity:true
              , revenue:true
              , year:2018
              , description:'Test Product Automation'
            })
            .save();

    });*/
});

