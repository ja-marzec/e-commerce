import ProductsList from "./ProductsList";

export default function Home() {

    return(
        <div>

            <div className="kivi">
                <img src="https://picsum.photos/id/1002/1600/500" />
            </div>
            
            <div className="section__header">
                SKLEP DLA KAŻDEGO
            </div>
            <ProductsList />
        </div>
    )
}