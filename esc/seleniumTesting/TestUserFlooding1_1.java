package seleniumTesting;
import java.util.List;
import org.openqa.selenium.By;
import org.openqa.selenium.JavascriptExecutor;
import org.openqa.selenium.Keys;
import org.openqa.selenium.StaleElementReferenceException;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.firefox.FirefoxDriver;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;


public class TestUserFlooding1_1 {
	
	static int numUsers = 1;
	
public static void main(String[] args) throws InterruptedException {		
	threadMaker1(20);

	

		
		
	}
public static void threadMaker1(int x) {
	for(int i=0;i<x;i++) {
		new Thread(new Runnable() {
			public void run() {
				try {
					addUser1();
				} catch (InterruptedException e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				}
			}
		}).start();
		
	}
	
	
	
}

public static void addUser1() throws InterruptedException {
	
	
//	System.out.println("adding user: "+ numUsers);
//	numUsers++;

	System.setProperty("webdriver.chrome.driver","C:\\Users\\akmal\\Downloads\\chromedriver_win32\\chromedriver.exe"); //change path
	
	WebDriver driver = new ChromeDriver();
//	WebDriver driver2 = new ChromeDriver();
//	driver2.get("http://localhost:3000/");
	driver.get("http://localhost:3000/");
	
	WebElement chatButton = driver.findElement(By.id("support_image"));
	chatButton.click();
	Thread.sleep(3000);
	
	WebElement yesButton = driver.findElement(By.className("botui-actions-buttons-button"));
	yesButton.click();
	
	Thread.sleep(3000);

	List<WebElement> allClassSameType = driver.findElements(By.className("botui-actions-buttons-button"));

	
	allClassSameType.get(0).click(); //0 1 2 depending on uPhone uPad or General
	Thread.sleep(20000);

	
	System.out.println("successfully connected");
	Thread.sleep(3000);
	



}

}
