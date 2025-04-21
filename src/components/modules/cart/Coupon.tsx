"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { Trash } from "lucide-react";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import {
  couponSelector,
  shopSelector,
  subTotalSelector,
} from "@/redux/features/cartSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";

export default function Coupon() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const subTotal = useAppSelector(subTotalSelector);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const shopId = useAppSelector(shopSelector);
  const { isLoading, code } = useAppSelector(couponSelector);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const dispatch = useAppDispatch();

  const form = useForm();

  const couponInput = form.watch("coupon");

  const handleRemoveCoupon = () => {
    form.reset();
  };

  // const onSubmit: SubmitHandler<FieldValues> = async (data) => {
  //   try {
  //     const res = await dispatch(
  //       fetchCoupon({ couponCode: data.coupon, subTotal, shopId })
  //     ).unwrap();
  //     console.log(res, "inside component");
  //   } catch (error: any) {
  //     console.log(error);
  //     toast.error(error.message);
  //   }
  // };

  return (
    <div className="border-2 border-white bg-background brightness-105 rounded-md col-span-4  p-5 ">
      <div className="flex flex-col justify-between h-full">
        <h1 className="text-2xl font-bold">Use Coupon code</h1>
        <p className="text-gray-500">Enter your coupon code if you have one.</p>

        <Form {...form}>
          {/* <form className="mt-3" onSubmit={form.handleSubmit(onSubmit)}> */}
          <form className="mt-3">
            <FormField
              control={form.control}
              name="coupon"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      {...field}
                      className="rounded-full"
                      placeholder="Promo / Coupon code"
                      value={field.value || code}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <div className="flex gap-3 mt-3">
              <Button
                disabled={!couponInput}
                type="submit"
                className="w-full text-xl font-semibold py-5 "
              >
                {isLoading ? "Applying..." : "Apply"}
              </Button>
              {couponInput && (
                <Button
                  onClick={handleRemoveCoupon}
                  variant="outline"
                  className="bg-red-100 rounded-full size-10"
                >
                  <Trash size={24} className="text-red-500" />
                </Button>
              )}
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}
