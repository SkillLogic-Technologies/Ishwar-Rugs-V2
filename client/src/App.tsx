import { Switch, Route,useLocation  } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/components/theme-provider";
import ScrollToTop from "@/components/ScrollToTop"; // ✅ NEW

import ModernNavigation from "@/components/modern-navigation";
import ModernFooter from "@/components/modern-footer";

// Public pages
import Home from "@/pages/home";
import Collections from "@/pages/collections";
import CollectionDetail from "@/pages/collection-detail";
import CategoryPage from "@/pages/category/category";
import About from "@/pages/about";
import Contact from "@/pages/contact";
import Stories from "@/pages/stories";
import NotFound from "@/pages/not-found";
// import Login from "@/pages/login";
import Verify from "@/pages/verify";
// Admin pages
import AdminLogin from "@/pages/admin/login";
import AdminDashboard from "@/pages/admin/dashboard";
import AdminCollections from "@/pages/admin/collections";
import AdminProducts from "@/pages/admin/products";
import InquiriesPage from "@/pages/admin/inquiries";
import AdminCustomers from "@/pages/admin/customers";
import AdminOrders from "@/pages/admin/orders";
import "@/components/styles/carousel.css";

function Router() {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <ModernNavigation />
      <ScrollToTop /> {/* ✅ Scroll to top on route change */}

      <main className="flex-1 ">
        <Switch>
          {/* Public routes */}
          <Route path="/" component={Home} />
          <Route path="/collections" component={Collections} />
          <Route path="/about" component={About} />
          <Route path="/contact" component={Contact} />
          <Route path="/stories" component={Stories} />

          {/* Admin routes */}
          <Route path="/admin/login" component={AdminLogin} />
          <Route path="/admin/dashboard" component={AdminDashboard} />
          <Route path="/admin/collections" component={AdminCollections} />
          <Route path="/admin/products" component={AdminProducts} />
          <Route path="/admin/inquiries" component={InquiriesPage} />
          <Route path="/admin/customers" component={AdminCustomers} />
          <Route path="/admin/orders" component={AdminOrders} />

           {/* <Route path="/login" component={Login} /> */}
          < Route path="/verify" component={Verify}/>


          {/* Dynamic public routes */}
          <Route path="/collections/:slug" component={CollectionDetail} />
          <Route path="/category/:category" component={CategoryPage} />

          {/* Fallback */}
          <Route component={NotFound} />
        </Switch>
      </main>
      <ModernFooter />
    </div>
  );
}

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="ishwar-theme">
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
}

export default App;