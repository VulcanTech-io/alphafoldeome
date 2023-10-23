export const Footer = () => {
  return (
    <footer className="bg-color-primary relative z-10 block bg-opacity-100 p-3 py-6 text-center text-white">
      <p className="text-xl text-gray-400">
        COPYRIGHT &#169; {new Date().getFullYear()} <br className="md:hidden" />{" "}
        Alpha Proteome
      </p>
    </footer>
  );
};
