import SwiperTestimonial from "./TestimonialSwiper";

export default function Testimonial() {
  return (
    <div className="bg-red-50">
      <div className="w-full">
        <div className="grid grid-cols-1 md:grid-cols-12">

          {/* LEFT CONTENT */}
          <div className="md:col-span-5 bg-white flex items-center py-10">
            <div className="w-full px-6 md:px-12">
              <p className="mb-0 text-primary font-semibold text-base">
                TESTIMONIAL
              </p>

              <h2 className="text-[54px] font-bold leading-tight m-0">
                All about <br /> Kastara Ocean
              </h2>

              <div className="mt-4">
                <h3 className="text-[42px] text-primary font-bold mb-0">
                  A+ Rating
                </h3>
                <p className="m-0 font-semibold text-base">
                  Avg rating 4.8 makes us the best Website.
                </p>
              </div>
            </div>
          </div>

          {/* RIGHT CONTENT */}
          <div className="md:col-span-7 bg-red-50 flex items-center py-10 px-5">
            <SwiperTestimonial />
          </div>

        </div>
      </div>
    </div>
  )
}
