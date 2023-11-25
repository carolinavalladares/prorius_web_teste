import Header from "./Header";

interface IProps {
  children: JSX.Element | JSX.Element[];
}

const Layout = ({ children }: IProps) => {
  return (
    <div className="font-montserrat">
      <Header />
      <section className="max-w-5xl m-auto px-4 lg:px-0 mt-4">
        {children}
      </section>
    </div>
  );
};

export default Layout;
