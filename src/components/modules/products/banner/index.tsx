import styles from "./Banner.module.css";
const ProductBanner = ({ title, path }: { title: string; path: string }) => {
  return (
    <div
      className={`${styles.banner} border-2 border-white rounded-3xl mt-10 flex justify-center items-center`}
    >
      <div className="text-center">
        <h2 className="font-bold text-2xl leading-loose">{title}</h2>
        <p>{path}</p>
      </div>
    </div>
  );
};

export default ProductBanner;
