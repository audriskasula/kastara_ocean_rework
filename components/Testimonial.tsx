import SwiperTestimonial from "./TestimonialSwiper";

export default function Testimonial() {
  return (
    <div className="bg-red-50">
      <div className="w-full">
        <div className="grid grid-cols-1 md:grid-cols-12">
          {/* LEFT CONTENT */}
          <div className="md:col-span-5 bg-white flex items-center py-10 md:py-16">
            <div className="w-full px-6 md:px-12">
              <p className="mb-1 text-primary font-semibold text-sm uppercase tracking-wider">
                Testimonial
              </p>

              <h2 className="text-4xl md:text-[54px] font-bold leading-tight m-0">
                All about <br /> Kastara Ocean
              </h2>

              <div className="mt-6">
                <h3 className="text-3xl md:text-[42px] text-primary font-bold mb-1">
                  A+ Rating
                </h3>
                <p className="m-0 font-medium text-gray-600 text-base">
                  Avg rating 4.8 makes us the best choice.
                </p>
              </div>
            </div>
          </div>

          {/* RIGHT CONTENT */}
          <div className="md:col-span-7 bg-red-50 flex items-center py-10 md:py-16 px-5">
            <SwiperTestimonial />
          </div>
        </div>
      </div>
    </div>
  );
}
