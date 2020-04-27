import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;


public class SeleniumTest{
    public static String PATH = "http://localhost:3000";
    public static WebDriver driver;
    public static void main(String[] args){
        System.out.println(testRobust());
    }

    public static boolean testRobust(){
        try {
            driver = new ChromeDriver();
            driver.get(PATH);
            WebElement support = ((ChromeDriver) driver).findElementById("support_image");
            support.click();
            Thread.sleep(1000);
            WebElement nextButton = ((ChromeDriver) driver).findElement(By.xpath("/html/body/div[1]/div[1]/div/div[2]/div/div/button[1]"));
            nextButton.click();
            Thread.sleep(2000);
            WebElement nextButton2 = ((ChromeDriver) driver).findElement(By.xpath("/html/body/div[1]/div[1]/div/div[2]/div/div/button[1]"));
            nextButton2.click();
            Thread.sleep(20000);
            try{
                for(int i=0; i < 50; i++) {
                    WebElement input = ((ChromeDriver) driver).findElementByClassName("botui-actions-text-input");
                    WebElement form = ((ChromeDriver) driver).findElementByClassName("botui-actions-text");
                    input.sendKeys("spamtest");
                    Thread.sleep(200);
                    form.submit();
                }}catch(Exception e){
                System.out.println("Disconnected");
            }
            driver.close();
            return true;
        } catch (final Exception e) {
            return false;
        }
    }

}

