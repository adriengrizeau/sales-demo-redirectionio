import Link from "next/link";
import { euro, type Product } from "@/data/catalog";

export function Swatch({ color }: { color: string }) {
  return (
    <div className="swatch" style={{ background: color }} aria-hidden="true">
      <div className="bulb" />
    </div>
  );
}

export function ProductCard({ product }: { product: Product }) {
  return (
    <Link href={`/produit/${product.slug}`} className="card">
      <Swatch color={product.color} />
      <div className="card-body">
        <h3>
          {product.name}
          {product.bestseller ? <span className="tag">Best-seller</span> : null}
        </h3>
        <span className="muted">{product.material}</span>
        <div className="price">{euro(product.price)}</div>
      </div>
    </Link>
  );
}
