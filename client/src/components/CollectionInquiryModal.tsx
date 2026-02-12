import { useForm } from "react-hook-form";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
// import { insertInquirySchema, type InsertInquiry } from "@shared/schema";
import { useMutation } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { useToast } from "@/hooks/use-toast";
import { useEffect } from "react";

type Props = {
  open: boolean;
  onClose: () => void;
  defaultSubject: string;
};

export default function CollectionInquiryModal({ open, onClose, defaultSubject }: Props) {
  const { toast } = useToast();

  const form = useForm<InsertInquiry>({
    resolver: zodResolver(insertInquirySchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      subject: defaultSubject,
      message: "",
      type: "collection_inquiry",
    },
  });

  // ✅ Sync subject dynamically when modal opens
  useEffect(() => {
    if (open) {
      form.reset({
        ...form.getValues(),
        subject: defaultSubject,
      });
    }
  }, [defaultSubject, open]);

  const mutation = useMutation({
    mutationFn: api.inquiries.create,
    onSuccess: () => {
      toast({ title: "Inquiry sent successfully" });
      onClose();
    },
    onError: () => {
      toast({ title: "Failed to submit inquiry", variant: "destructive" });
    },
  });

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-xl">
        <DialogHeader>
          <DialogTitle className="font-serif text-2xl">Inquire About Collection</DialogTitle>
        </DialogHeader>

        <form
          onSubmit={form.handleSubmit((data) => mutation.mutate(data))}
          className="space-y-4"
        >
          <Input {...form.register("name")} placeholder="Your Name *" />
          <Input {...form.register("phone")} placeholder="Phone Number *" />
          <Input {...form.register("email")} placeholder="Email (optional)" />
          <Textarea {...form.register("message")} placeholder="Your message *" rows={4} />

          {/* ✅ Hidden subject field */}
          <input type="hidden" {...form.register("subject")} />

          <Button type="submit" className="w-full" disabled={mutation.isPending}>
            {mutation.isPending ? "Sending..." : "Submit Inquiry"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
