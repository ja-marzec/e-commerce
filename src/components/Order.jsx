import { setCheckout, setCheckoutInfo} from '../app/slice';
import { useSelector, useDispatch } from 'react-redux';
import {useState, useEffect, useRef} from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";
  import { commerce } from '../lib/commerce';
import Payment from './Payment';

export default function Order() {
    const dispatch = useDispatch();
    const cart = useSelector(state => state.shop.cartItems)
    const checkout = useSelector(state => state.shop.checkout);
    const checkoutId = useSelector(state => state.shop.checkout.checkoutToken.id)
    const [id, setId] = useState("")
    

    function useEffectUpdate(effect, deps) {
        const isFirstRender = useRef(true) 
      
        useEffect(() => {
          if (!isFirstRender.current) {
            effect()
          }  
        }, deps) // eslint-disable-line react-hooks/exhaustive-deps
      
        useEffect(() => {
          isFirstRender.current = false;
        }, []);
      }


    async function  generateCheckoutToken() {
            commerce.checkout.generateToken(cart.id, { type: 'cart' })
            .then((token) => {
                dispatch(setCheckout(token));
            }).catch((error) => {
                console.log('There was an error in generating a token', error);
            });
      }
      
      useEffect(() => {
          generateCheckoutToken()
          // if(checkoutId) {
          //   fetchShippingCountries()
          // }
          fetchSubdivisions("PL");
      },[])
      useEffectUpdate(() => { fetchShippingCountries() }, [checkoutId])
      useEffectUpdate(() => {   fetchShippingOptions(checkoutId, checkout.shippingSubdivision) }, [checkoutId])

      function handleInputChange (e) {
        dispatch(setCheckoutInfo({keyName: e.target.name, value: e.target.value}))
      }

      function fetchShippingCountries() {
        console.log("ID HERE", checkoutId + "11");      
        commerce.services.localeListShippingCountries(checkoutId).then((countries) => {
            console.log("COUNTRY",countries);
            //   this.setState({ 
            // shippingCountries: countries.countries,
            //   })
        }).catch((error) => {
          console.log('There was an error fetching a list of shipping countries', error);
        });
      }
    
      function fetchSubdivisions(countryCode) {
        commerce.services.localeListSubdivisions(countryCode).then((subdivisions) => {
            console.log("SUB", subdivisions);
          dispatch(setCheckoutInfo({keyName: "shippingSubdivisions", value: subdivisions.subdivisions}))

        }).catch((error) => {
            console.log('There was an error fetching the subdivisions', error);
        });
      }

     function fetchShippingOptions(checkoutTokenId, region = null) {
          commerce.checkout.getShippingOptions(checkoutTokenId,
          { 
            country: "PL",
          }).then((options) => {
            console.log(options)
            const shippingOption = options[0] || null;
            dispatch(setCheckoutInfo({keyName: "shippingOptions", value: options}))
            dispatch(setCheckoutInfo({keyName: "shippingOption", value: shippingOption}));

              // this.setState({
            //   shippingOptions: options,
            //   shippingOption: shippingOption,
            // })

          }).catch((error) => {
            console.log('There was an error fetching the shipping methods', error);
        });
      }


    return (
             <div>
                <div>ORDER LIST</div>
                <div>
                        {checkout !== undefined ? 
                   
                   <form>
                        <br/>
                        FIRST NAME
                        <input id="firstName" value={checkout?.firstName} name="firstName" onChange={(e) => handleInputChange(e)}/>
                        <br/>
                        

                        lastName
                        <input id="firstName" value={checkout?.lastName} name="lastName" onChange={(e) => handleInputChange(e)}/>
                        <br/>

                        email
                        <input id="firstName" value={checkout?.email} name="email" onChange={(e) => handleInputChange(e)}/>
                        <br/>

                        shippingName
                        <input id="firstName" value={checkout?.shippingName} name="shippingName" onChange={(e) => handleInputChange(e)}/>
                        <br/>

                        shippingStreet
                        <input id="firstName" value={checkout?.shippingStreet} name="shippingStreet" onChange={(e) => handleInputChange(e)}/>
                        <br/>

                        shippingCity
                        <input id="firstName" value={checkout?.shippingCity} name="shippingCity" onChange={(e) => handleInputChange(e)}/>
                        <br/>

                        shippingPostalZipCode
                        <input id="firstName" value={checkout?.shippingPostalZipCode} name="shippingPostalZipCode" onChange={(e) => handleInputChange(e)}/>
                        <br/>

                        shippingCountry
                        <input id="firstName" value={checkout?.shippingCountry} name="shippingCountry" onChange={(e) => handleInputChange(e)}/>
                        <br/>

                        expMonth
                        <input id="firstName" value={checkout?.expMonth} name="expMonth" onChange={(e) => handleInputChange(e)}/>
                        <br/>

                        expYear
                        <input id="firstName" value={checkout?.expYear} name="expYear" onChange={(e) => handleInputChange(e)}/>
                        <br/>

                        ccv
                        <input id="firstName" value={checkout?.ccv} name="ccv" onChange={(e) => handleInputChange(e)}/>
                        <br/>

                        billingPostalZipcode
                        <input id="firstName" value={checkout?.billingPostalZipcode} name="billingPostalZipcode" onChange={(e) => handleInputChange(e)}/>
                        <br/>

                        {/* shippingCountries
                        <input id="firstName" value={checkout?.shippingCountries} name="shippingCountries" onChange={(e) => handleInputChange(e)}/>
                        <br/> */}

                        shippingSubdivisions
                        <select
                        onChange={(e) =>{
                          console.log(e.target.value);
                          dispatch(setCheckoutInfo({keyName: "shippingSubdivision", value: e.target.value}))} }
                     >
                          { Object.entries(checkout.shippingSubdivisions).map(([keyname, item]) => {
                            return (
                                <option value={keyname}>{item}</option>
                            )
                          }) }
                        </select>
                        <br/>
                        shippingOptions

                        <select
                        onChange={(e) =>{
                          dispatch(setCheckoutInfo({keyName: "shippingOption", value: e.target.value}))} }
                     >
                          {checkout.shippingOptions.map((item) => {
                            return (
                                <option value={item}>
                                  {item.description}
                                </option>
                            )
                          })}
                        </select>
                        <br/>

                    </form>
                    : 
                    null
                    }

                </div>

                <Payment />
             </div>
    )
}